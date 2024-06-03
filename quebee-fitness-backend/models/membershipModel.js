const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  membershipType: {
    type: String,
    enum: ['basic', 'premium', 'vip'],
    default: 'basic'
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Membership', MembershipSchema);
