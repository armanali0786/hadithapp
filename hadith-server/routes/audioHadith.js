const express = require('express');
const multer = require('multer');
const path = require('path');
const jwt = require('jsonwebtoken');
const AudioHadith = require('../models/AudioHadith');

const router = express.Router();

// Multer config — store audio files in uploads/, preserve original extension
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

// GET all audio hadiths
// Optional: ?featured=true, ?active=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.active === 'true') filter.isActive = true;
    const audioHadiths = await AudioHadith.find(filter)
      .populate('hadithTypeId')
      .sort({ order: 1, createdAt: -1 });
    res.json({ status: 'success', results: audioHadiths.length, data: { audioHadiths } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET single audio hadith by ID
router.get('/:id', async (req, res) => {
  try {
    const audioHadith = await AudioHadith.findById(req.params.id).populate('hadithTypeId');
    if (!audioHadith) return res.status(404).json({ status: 'fail', message: 'Audio hadith not found' });
    res.json({ status: 'success', data: { audioHadith } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create audio hadith (admin only)
router.post('/', adminAuth, upload.single('audio'), async (req, res) => {
  try {
    const { title, arabicTitle, reciterName, duration, description, hadithTypeId, isActive, isFeatured, order } = req.body;
    if (!req.file) {
      return res.status(400).json({ status: 'fail', message: 'Audio file is required' });
    }
    const audioUrl = `uploads/${req.file.filename}`;
    const audioHadith = await AudioHadith.create({
      title,
      arabicTitle,
      reciterName,
      audioUrl,
      duration,
      description,
      hadithTypeId,
      isActive,
      isFeatured,
      order
    });
    res.status(201).json({ status: 'success', data: { audioHadith } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update audio hadith (admin only)
router.put('/:id', adminAuth, upload.single('audio'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.audioUrl = `uploads/${req.file.filename}`;
    const audioHadith = await AudioHadith.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!audioHadith) return res.status(404).json({ status: 'fail', message: 'Audio hadith not found' });
    res.json({ status: 'success', data: { audioHadith } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE audio hadith (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const audioHadith = await AudioHadith.findByIdAndDelete(req.params.id);
    if (!audioHadith) return res.status(404).json({ status: 'fail', message: 'Audio hadith not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
