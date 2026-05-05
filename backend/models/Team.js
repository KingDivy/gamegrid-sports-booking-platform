const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  eventId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  teamName:        { type: String, required: true, trim: true },
  teamNameLower:   { type: String },
  createdBy:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  playerName:      { type: String, default: '' },
  playerPhone:     { type: String, default: '' },
  numberOfPlayers: { type: Number, required: true },
  members:         [{ type: String }],
  paymentMethod:   { type: String, enum: ['online','card','upi','cash'], default: 'online' },
  paymentStatus:   { type: String, enum: ['Paid','Pending'], default: 'Paid' },
  isOffline:       { type: Boolean, default: false },
  razorpayOrderId:   { type: String, default: '' },
  razorpayPaymentId: { type: String, default: '' },
}, { timestamps: true });

// Auto-lowercase teamName before save (for case-insensitive uniqueness)
teamSchema.pre('save', function (next) {
  this.teamNameLower = this.teamName.toLowerCase();
  next();
});

// Case-insensitive unique team name per event
teamSchema.index({ eventId: 1, teamNameLower: 1 }, { unique: true });

module.exports = mongoose.model('Team', teamSchema);
