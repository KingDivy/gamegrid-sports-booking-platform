const router = require('express').Router();
const Venue  = require('../models/Venue');
const Slot   = require('../models/Slot');
const DayOff = require('../models/DayOff');
const { authMiddleware } = require('../middleware/auth');

// Helper: generate slots for venue/date/sport if not already in DB
async function ensureSlots(venue, date, sport) {
  const existing = await Slot.find({ venueId: venue._id, sport, date });
  if (existing.length > 0) return existing;

  const startHour = parseInt(venue.activeHoursStart.split(':')[0]);
  let endHour = parseInt(venue.activeHoursEnd.split(':')[0]);
  if (endHour === 0) endHour = 24;

  const toCreate = [];
  for (let h = startHour; h < endHour; h++) {
    const startTime  = `${String(h).padStart(2, '0')}:00`;
    const endTime    = `${String(h + 1).padStart(2, '0')}:00`;
    const isPeak     = venue.peakHours && venue.peakHours.includes(startTime);
    const pEntry     = venue.pricing.get ? venue.pricing.get(sport) : venue.pricing[sport];
    const pricing    = pEntry || { base: 500, peak: 800 };
    toCreate.push({ venueId: venue._id, sport, date, startTime, endTime, duration: 60, price: isPeak ? pricing.peak : pricing.base, isPeak });
  }
  try {
    return await Slot.insertMany(toCreate, { ordered: false });
  } catch {
    return await Slot.find({ venueId: venue._id, sport, date });
  }
}

// GET /api/venues
router.get('/', async (req, res) => {
  try {
    const { sport, city, search, minPrice, maxPrice } = req.query;
    let query = { isActive: true };
    if (sport && sport !== 'all') query.sports = sport;
    if (city)   query.city = { $regex: city, $options: 'i' };
    if (search) query.$or = [
      { name:     { $regex: search, $options: 'i' } },
      { address:  { $regex: search, $options: 'i' } },
      { locality: { $regex: search, $options: 'i' } },
      { city:     { $regex: search, $options: 'i' } },
    ];

    // imageData is select:false so it's automatically excluded
    let venues = await Venue.find(query).lean({ virtuals: true });

    if (minPrice || maxPrice) {
      venues = venues.filter(v => {
        const prices = v.pricing ? Object.values(v.pricing).map(p => p.base || 0) : [0];
        const minV   = Math.min(...prices);
        if (minPrice && minV < parseInt(minPrice)) return false;
        if (maxPrice && minV > parseInt(maxPrice)) return false;
        return true;
      });
    }
    res.json(venues);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/venues/:id
router.get('/:id', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).lean({ virtuals: true });
    if (!venue) return res.status(404).json({ error: 'Venue not found' });
    res.json(venue);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/venues/:id/image — prefers imageUrl (CDN), falls back to base64
router.get('/:id/image', async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id).select('+imageData +imageContentType imageUrl');
    if (!venue) return res.status(404).json({ error: 'Venue not found' });

    // Seeded venues have imageUrl — redirect so browser can cache it directly
    if (venue.imageUrl) return res.redirect(venue.imageUrl);

    // Owner-uploaded base64 image
    if (venue.imageData) {
      const buf = Buffer.from(venue.imageData, 'base64');
      res.set('Content-Type', venue.imageContentType || 'image/jpeg');
      return res.send(buf);
    }

    res.status(404).json({ error: 'No image available' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/venues/:id/slots?date=&sport=
router.get('/:id/slots', async (req, res) => {
  try {
    const { date, sport } = req.query;
    if (!date || !sport) return res.status(400).json({ error: 'date and sport are required' });

    const today = new Date().toISOString().split('T')[0];
    if (date < today) return res.status(400).json({ error: 'Cannot view slots for past dates' });

    const venue = await Venue.findById(req.params.id);
    if (!venue) return res.status(404).json({ error: 'Venue not found' });

    const dayOff = await DayOff.findOne({ venueId: venue._id, sport, date }).lean();
    if (dayOff) return res.json({ closed: true, reason: dayOff.reason || 'Venue is closed for this day' });

    await ensureSlots(venue, date, sport);

    let slots = await Slot.find({ venueId: venue._id, sport, date }).sort('startTime').lean();

    if (date === today) {
      const nowHour = new Date().getHours();
      slots = slots.filter(s => parseInt(s.startTime.split(':')[0]) > nowHour);
    }

    res.json(slots);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
