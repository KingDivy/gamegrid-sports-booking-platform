require('dotenv').config();
const mongoose = require('mongoose');
const User  = require('./models/User');
const Venue = require('./models/Venue');

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI || MONGO_URI.includes('<db_password>')) {
  console.error('❌  Fix MONGO_URI in backend/.env — replace <db_password> with your real Atlas password.');
  process.exit(1);
}

const USERS = [
  { name: 'Sports Hub Owner', email: 'owner@gamegrid.com', password: 'owner123', role: 'owner', phone: '9999900000' },
  { name: 'Demo Player',      email: 'player@gamegrid.com', password: 'player123', role: 'player', phone: '9999911111' },
];

const VENUES = [
  {
    name: 'SportZone Box Cricket Arena', address: 'Plot 42, Satellite Road', city: 'Ahmedabad', locality: 'Satellite',
    sports: ['Box Cricket'], amenities: ['Parking','Changing Room','Cafeteria','Floodlights'],
    pricing: { 'Box Cricket': { base: 600, peak: 900 } }, peakHours: ['18:00','19:00','20:00'],
    activeHoursStart: '06:00', activeHoursEnd: '23:00',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
    description: 'Premium indoor box cricket with astro turf and LED lighting.',
  },
  {
    name: 'AceShuttle Badminton Club', address: 'B-12, Sindhu Bhavan Road', city: 'Ahmedabad', locality: 'Bodakdev',
    sports: ['Badminton'], amenities: ['Parking','Washrooms','First Aid','Changing Room'],
    pricing: { 'Badminton': { base: 300, peak: 500 } }, peakHours: ['07:00','08:00','18:00','19:00','20:00'],
    activeHoursStart: '06:00', activeHoursEnd: '22:00',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&q=80',
    description: 'Professional badminton courts with maple flooring.',
  },
  {
    name: 'GrandSlam Tennis Academy', address: 'Near BRTS, Vastrapur Lake Road', city: 'Ahmedabad', locality: 'Vastrapur',
    sports: ['Tennis'], amenities: ['Parking','Cafeteria','Washrooms','First Aid'],
    pricing: { 'Tennis': { base: 400, peak: 700 } }, peakHours: ['07:00','08:00','17:00','18:00','19:00'],
    activeHoursStart: '06:00', activeHoursEnd: '22:00',
    imageUrl: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&q=80',
    description: 'Hard and clay courts with coaching available on request.',
  },
  {
    name: 'GoalZone Football Turf', address: 'Opp. Science City, Sola Road', city: 'Ahmedabad', locality: 'Sola',
    sports: ['Football'], amenities: ['Parking','Changing Room','Floodlights','First Aid'],
    pricing: { 'Football': { base: 800, peak: 1200 } }, peakHours: ['17:00','18:00','19:00','20:00'],
    activeHoursStart: '06:00', activeHoursEnd: '23:00',
    imageUrl: 'https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800&q=80',
    description: '5-a-side and 7-a-side football turf with FIFA-quality synthetic grass.',
  },
  {
    name: 'GameGrid Multi Sports Center', address: 'Nr. Iskcon, S G Highway', city: 'Ahmedabad', locality: 'Gota',
    sports: ['Box Cricket','Badminton','Football'], amenities: ['Parking','Cafeteria','Floodlights','CCTV'],
    pricing: { 'Box Cricket': { base: 700, peak: 1000 }, 'Badminton': { base: 250, peak: 400 }, 'Football': { base: 750, peak: 1100 } },
    peakHours: ['07:00','08:00','18:00','19:00','20:00','21:00'],
    activeHoursStart: '06:00', activeHoursEnd: '23:00',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    description: 'All-in-one sports facility — cricket, badminton and football under one roof.',
  },
  {
    name: 'RoyalSmash Sports Club', address: '45, Prahlad Nagar Garden Road', city: 'Ahmedabad', locality: 'Prahlad Nagar',
    sports: ['Badminton','Tennis'], amenities: ['Parking','Changing Room','Cafeteria','CCTV'],
    pricing: { 'Badminton': { base: 350, peak: 550 }, 'Tennis': { base: 450, peak: 750 } },
    peakHours: ['07:00','08:00','17:00','18:00','19:00'],
    activeHoursStart: '06:00', activeHoursEnd: '22:00',
    imageUrl: 'https://images.unsplash.com/photo-1617711164094-dae2c79b49bb?w=800&q=80',
    description: 'Premium sports club with dedicated courts for badminton and tennis lovers.',
  },
  // ── Real Ahmedabad venues ──────────────────────────────────
  {
    name: 'Eklavya Sports Academy', address: 'Eklavya Sports Academy, Thaltej', city: 'Ahmedabad', locality: 'Thaltej',
    sports: ['Tennis','Box Cricket'], amenities: ['Parking','Coaching Available','Floodlights','First Aid','Drinking Water'],
    pricing: { 'Tennis': { base: 450, peak: 750 }, 'Box Cricket': { base: 600, peak: 950 } },
    peakHours: ['06:00','07:00','08:00','17:00','18:00','19:00','20:00'],
    activeHoursStart: '06:00', activeHoursEnd: '22:00',
    imageUrl: 'https://images.unsplash.com/photo-1601134467661-3d775b999c9b?w=800&q=80',
    description: 'Leading Ahmedabad academy with certified coaches in Tennis and Cricket.',
  },
  {
    name: 'Ahmedabad Racquet Academy (ARA)', address: 'ARA Sports Complex, Near Satellite Cross Roads', city: 'Ahmedabad', locality: 'Satellite',
    sports: ['Badminton','Football'], amenities: ['Parking','Cafeteria','Scoreboard','Coaching Available','Floodlights'],
    pricing: { 'Badminton': { base: 320, peak: 550 }, 'Football': { base: 850, peak: 1300 } },
    peakHours: ['06:00','07:00','08:00','18:00','19:00','20:00','21:00'],
    activeHoursStart: '06:00', activeHoursEnd: '22:30',
    imageUrl: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800&q=80',
    description: "Ahmedabad's premier racquet sports destination with structured coaching programs.",
  },
  {
    name: 'The Arena — TransStadia', address: 'TransStadia, Sardar Patel Ring Road, Ellisbridge', city: 'Ahmedabad', locality: 'Ellisbridge',
    sports: ['Football','Basketball','Badminton','Box Cricket'],
    amenities: ['Valet Parking','Food Court','Medical Room','Locker Room','Wi-Fi','CCTV','Floodlights'],
    pricing: { 'Football': { base: 1200, peak: 1800 }, 'Basketball': { base: 900, peak: 1400 }, 'Badminton': { base: 450, peak: 700 }, 'Box Cricket': { base: 1000, peak: 1500 } },
    peakHours: ['17:00','18:00','19:00','20:00','21:00'],
    activeHoursStart: '06:00', activeHoursEnd: '23:00',
    imageUrl: 'https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?w=800&q=80',
    description: "India's first hybrid stadium — world-class multi-sport facility in Ahmedabad.",
  },
  {
    name: 'Decathlon Applewoods Sports Zone', address: 'Decathlon Store, Applewoods Township, Shela', city: 'Ahmedabad', locality: 'Shela',
    sports: ['Football','Basketball'], amenities: ['Large Parking','Equipment Rental','Cafeteria','Floodlights','Sports Store On-Site'],
    pricing: { 'Football': { base: 900, peak: 1400 }, 'Basketball': { base: 700, peak: 1100 } },
    peakHours: ['16:00','17:00','18:00','19:00','20:00'],
    activeHoursStart: '08:00', activeHoursEnd: '22:00',
    imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&q=80',
    description: 'FIFA-quality turf and basketball court inside the Decathlon campus at Shela.',
  },
];

async function seed() {
  try {
    console.log('\n🔗  Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅  Connected! DB:', mongoose.connection.name, '\n');

    // Users
    let owner;
    for (const u of USERS) {
      let user = await User.findOne({ email: u.email });
      if (!user) { user = await User.create(u); console.log(`👤  Created: ${u.email}`); }
      else console.log(`👤  Exists : ${u.email}`);
      if (u.role === 'owner') owner = user;
    }

    // Venues
    let created = 0, skipped = 0;
    for (const v of VENUES) {
      if (await Venue.findOne({ name: v.name })) { console.log(`⏭️   Skipped: ${v.name}`); skipped++; continue; }
      await Venue.create({ ...v, ownerId: owner._id, rating: +(3.5 + Math.random() * 1.5).toFixed(1), totalReviews: Math.floor(Math.random() * 120) + 10 });
      console.log(`✅  Created: ${v.name}`); created++;
    }

    console.log(`\n🎉  Done! Created ${created} venues, skipped ${skipped}`);
    console.log('    Owner  → owner@gamegrid.com  / owner123');
    console.log('    Player → player@gamegrid.com / player123\n');
    process.exit(0);
  } catch (err) {
    console.error('❌  Seed error:', err.message);
    process.exit(1);
  }
}
seed();
