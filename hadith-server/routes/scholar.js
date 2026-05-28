const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const ScholarRecommendation = require('../models/ScholarRecommendation');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Multer config for scholar images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
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

// GET all scholars
// Optional: ?active=true, ?featured=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.featured === 'true') filter.isFeatured = true;
    const scholars = await ScholarRecommendation.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ status: 'success', results: scholars.length, data: { scholars } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET scholar by ID
router.get('/:id', async (req, res) => {
  try {
    const scholar = await ScholarRecommendation.findById(req.params.id);
    if (!scholar) return res.status(404).json({ status: 'fail', message: 'Scholar not found' });
    res.json({ status: 'success', data: { scholar } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create scholar (admin only)
router.post('/', adminAuth, upload.single('scholarImage'), async (req, res) => {
  try {
    const { scholarName, scholarTitle, recommendationText, arabicQuote, isActive, isFeatured, order, imageUrl } = req.body;
    let scholarImage;
    if (req.file) scholarImage = `uploads/${req.file.filename}`;
    else if (imageUrl && imageUrl.trim()) scholarImage = imageUrl.trim();
    const scholar = await ScholarRecommendation.create({
      scholarName, scholarTitle, scholarImage, recommendationText, arabicQuote, isActive, isFeatured, order
    });
    res.status(201).json({ status: 'success', data: { scholar } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update scholar (admin only)
router.put('/:id', adminAuth, upload.single('scholarImage'), async (req, res) => {
  try {
    const updates = { ...req.body };
    delete updates.imageUrl;
    if (req.file) updates.scholarImage = `uploads/${req.file.filename}`;
    else if (req.body.imageUrl && req.body.imageUrl.trim()) updates.scholarImage = req.body.imageUrl.trim();
    const scholar = await ScholarRecommendation.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!scholar) return res.status(404).json({ status: 'fail', message: 'Scholar not found' });
    res.json({ status: 'success', data: { scholar } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE scholar (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const scholar = await ScholarRecommendation.findByIdAndDelete(req.params.id);
    if (!scholar) return res.status(404).json({ status: 'fail', message: 'Scholar not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
