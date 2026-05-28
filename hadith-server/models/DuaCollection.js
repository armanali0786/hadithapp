const mongoose = require('mongoose');

const DuaCollectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  arabicTitle: String,
  arabicText: { type: String, required: true },
  transliteration: String,
  translations: {
    english: String,
    urdu: String,
    bengali: String
  },
  reference: String,
  category: {
    type: String,
    enum: ['morning', 'evening', 'after-prayer', 'general', 'travel', 'eating', 'sleeping', 'other'],
    default: 'general'
  },
  audioUrl: String,
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const DuaCollection = mongoose.model('DuaCollection', DuaCollectionSchema);
module.exports = DuaCollection;
