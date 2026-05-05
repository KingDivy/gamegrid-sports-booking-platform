const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema(
  { base: { type: Number, default: 500 }, peak: { type: Number, default: 800 } },
  { _id: false }
);

const venueSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },

    name:        { type: String, required: true, trim: true },
    description: { type: String, default: '' },

    address:     { type: String, required: true },
    city:        { type: String, required: true, index: true },
    locality:    { type: String, default: '' },
    locationUrl: { type: String, default: '' },

    sports:    [{ type: String, trim: true }],
    amenities: [{ type: String, trim: true }],

    pricing: { type: Map, of: pricingSchema, default: {} },

    peakHours:        [{ type: String }],
    activeHoursStart: { type: String, default: '06:00' },
    activeHoursEnd:   { type: String, default: '22:00' },
    slotDuration:     { type: Number, default: 60 },

    // ── imageUrl: for seed/CDN images (preferred) ──────────────
    imageUrl: { type: String, default: '' },

    // ── imageData/imageContentType: for owner-uploaded images ──
    imageData:        { type: String, default: '', select: false },
    imageContentType: { type: String, default: '', select: false },

    rating:       { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    isActive:     { type: Boolean, default: true, index: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: resolves to the best available image URL
venueSchema.virtual('resolvedImageUrl').get(function () {
  if (this.imageUrl) return this.imageUrl;
  if (this.imageData) return `/api/venues/${this._id}/image`;
  return '';
});

venueSchema.index(
  { name: 'text', address: 'text', locality: 'text', city: 'text' },
  { name: 'venue_text_search' }
);

module.exports = mongoose.model('Venue', venueSchema);
