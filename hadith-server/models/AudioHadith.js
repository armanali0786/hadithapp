const mongoose = require('mongoose');

const AudioHadithSchema = new mongoose.Schema({
  title: { type: String, required: true },
  arabicTitle: String,
  reciterName: { type: String, required: true },
  audioUrl: { type: String, required: true },
  duration: String,
  description: String,
  hadithTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'HadithType' },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const AudioHadith = mongoose.model('AudioHadith', AudioHadithSchema);
module.exports = AudioHadith;
