const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  arabicTitle: String,
  content: { type: String, required: true },
  imageUrl: String,
  type: {
    type: String,
    enum: ['general', 'ramadan', 'event', 'news', 'eid'],
    default: 'general'
  },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  startDate: Date,
  endDate: Date,
  createdAt: { type: Date, default: Date.now }
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);
module.exports = Announcement;
