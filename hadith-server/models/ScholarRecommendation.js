const mongoose = require('mongoose');

const ScholarRecommendationSchema = new mongoose.Schema({
  scholarName: { type: String, required: true },
  scholarTitle: String,
  scholarImage: String,
  recommendationText: { type: String, required: true },
  arabicQuote: String,
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ScholarRecommendation = mongoose.model('ScholarRecommendation', ScholarRecommendationSchema);
module.exports = ScholarRecommendation;
