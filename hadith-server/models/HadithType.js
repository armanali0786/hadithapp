const mongoose = require('mongoose');

const hadithTypeSchema = new mongoose.Schema({
  hadithtype: {
    type: String, // Single string instead of an array
    required: true,
    unique: true // Ensures each Hadith type is unique
  }
}, { timestamps: true });

const HadithTypeList = mongoose.model('HadithType', hadithTypeSchema);

module.exports = HadithTypeList;
