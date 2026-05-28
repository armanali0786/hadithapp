const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const Announcement = require('../models/Announcement');

const router = express.Router();

// Multer config for announcement images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin auth middleware
function adminAuth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    if (!decoded.user.isAdmin) return res.status(403).json({ message: 'Not authorized' });
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET all announcements
// Optional: ?active=true (checks startDate/endDate window), ?type=<value>, ?featured=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.featured === 'true') filter.isFeatured = true;

    if (req.query.active === 'true') {
      const now = new Date();
      filter.isActive = true;
      // Include announcement if startDate is null OR now >= startDate
      // AND endDate is null OR now <= endDate
      filter.$and = [
        { $or: [{ startDate: null }, { startDate: { $lte: now } }] },
        { $or: [{ endDate: null }, { endDate: { $gte: now } }] }
      ];
    }

    const announcements = await Announcement.find(filter).sort({ isFeatured: -1, createdAt: -1 });
    res.json({ status: 'success', results: announcements.length, data: { announcements } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET announcement by ID
router.get('/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (!announcement) return res.status(404).json({ status: 'fail', message: 'Announcement not found' });
    res.json({ status: 'success', data: { announcement } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create announcement (admin only)
router.post('/', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { title, arabicTitle, content, type, isActive, isFeatured, startDate, endDate } = req.body;
    const imageUrl = req.file ? `uploads/${req.file.filename}` : undefined;
    const announcement = await Announcement.create({
      title, arabicTitle, content, imageUrl, type, isActive, isFeatured, startDate, endDate
    });
    res.status(201).json({ status: 'success', data: { announcement } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update announcement (admin only)
router.put('/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.imageUrl = `uploads/${req.file.filename}`;
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!announcement) return res.status(404).json({ status: 'fail', message: 'Announcement not found' });
    res.json({ status: 'success', data: { announcement } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE announcement (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);
    if (!announcement) return res.status(404).json({ status: 'fail', message: 'Announcement not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
