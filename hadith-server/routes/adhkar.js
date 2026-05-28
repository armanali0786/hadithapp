const express = require('express');
const jwt = require('jsonwebtoken');
const Adhkar = require('../models/Adhkar');

const router = express.Router();

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

// GET all adhkar
// Optional: ?type=morning|evening, ?active=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) filter.type = req.query.type;
    if (req.query.active === 'true') filter.isActive = true;
    const adhkar = await Adhkar.find(filter).sort({ order: 1 });
    res.json({ status: 'success', results: adhkar.length, data: { adhkar } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET adhkar by ID
router.get('/:id', async (req, res) => {
  try {
    const adhkar = await Adhkar.findById(req.params.id);
    if (!adhkar) return res.status(404).json({ status: 'fail', message: 'Adhkar not found' });
    res.json({ status: 'success', data: { adhkar } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create adhkar (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, arabicTitle, arabicText, transliteration, translations, count, reference, type, isActive, order } = req.body;
    const adhkar = await Adhkar.create({
      title, arabicTitle, arabicText, transliteration, translations, count, reference, type, isActive, order
    });
    res.status(201).json({ status: 'success', data: { adhkar } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update adhkar (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const adhkar = await Adhkar.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!adhkar) return res.status(404).json({ status: 'fail', message: 'Adhkar not found' });
    res.json({ status: 'success', data: { adhkar } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE adhkar (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const adhkar = await Adhkar.findByIdAndDelete(req.params.id);
    if (!adhkar) return res.status(404).json({ status: 'fail', message: 'Adhkar not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
