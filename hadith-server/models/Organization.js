const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  type: { type: String, enum: ['mosque', 'madrasa', 'foundation'], required: true },
  description: { type: String, default: '', trim: true },
  location: { type: String, default: '', trim: true },
  qrImage: { type: String, default: '' },
  upiId: { type: String, default: '', trim: true },
  accountHolder: { type: String, default: '', trim: true },
  accountNumber: { type: String, default: '', trim: true },
  ifscCode: { type: String, default: '', trim: true },
  bankName: { type: String, default: '', trim: true },
  isActive: { type: Boolean, default: true },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Organization', OrganizationSchema);
