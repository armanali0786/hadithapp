const mongoose = require('mongoose');

const IslamicQuoteSchema = new mongoose.Schema({
  arabicText: { type: String, required: true },
  translationText: { type: String, required: true },
  author: { type: String, required: true },
  authorTitle: String,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  category: {
    type: String,
    enum: ['general', 'morning', 'evening', 'friday', 'ramadan'],
    default: 'general'
  },
  createdAt: { type: Date, default: Date.now }
});

const IslamicQuote = mongoose.model('IslamicQuote', IslamicQuoteSchema);
module.exports = IslamicQuote;
