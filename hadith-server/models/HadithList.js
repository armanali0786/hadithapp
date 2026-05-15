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
  }
});

const HadithList = mongoose.model('HadithList', HadithListSchema);
module.exports = HadithList;
