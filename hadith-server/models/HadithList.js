const mongoose = require('mongoose');

// HadithList Schema with association to HadithType
const HadithListSchema = new mongoose.Schema({
  HadithImage: String,
  HadithTitle: String,
  HadithName: String,
  HadithDescription: String,
  Date: { type: Date, default: Date.now },
  hadithTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HadithType', // References the HadithType collection
    required: true
  },
  translations: {
    arabic: String,
    english: String,
    urdu: String,
    bengali: String
  },
  tafsir: String,
  audioUrl: String,
  isFeatured: { type: Boolean, default: false },
  isRamadanContent: { type: Boolean, default: false },
  narratorChain: String,
  grade: {
    type: String,
    enum: ['sahih', 'hasan', 'daif', 'mawdu', 'unknown'],
    default: 'unknown'
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }]
});

const HadithList = mongoose.model('HadithList', HadithListSchema);
module.exports = HadithList;
