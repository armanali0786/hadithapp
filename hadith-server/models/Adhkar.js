const mongoose = require('mongoose');

const AdhkarSchema = new mongoose.Schema({
  title: { type: String, required: true },
  arabicTitle: String,
  arabicText: { type: String, required: true },
  transliteration: String,
  translations: {
    english: String,
    urdu: String,
    bengali: String
  },
  count: { type: Number, default: 1 },
  reference: String,
  type: { type: String, enum: ['morning', 'evening'], required: true },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Adhkar = mongoose.model('Adhkar', AdhkarSchema);
module.exports = Adhkar;
