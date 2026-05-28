const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hadithId: { type: mongoose.Schema.Types.ObjectId, ref: 'HadithList', required: true },
  createdAt: { type: Date, default: Date.now }
});

BookmarkSchema.index({ userId: 1, hadithId: 1 }, { unique: true });

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);
module.exports = Bookmark;
