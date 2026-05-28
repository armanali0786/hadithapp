const express = require('express');
const jwt = require('jsonwebtoken');
const DuaCollection = require('../models/DuaCollection');

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

// GET all duas
// Optional: ?category=<value>, ?active=true
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.active === 'true') filter.isActive = true;
    const duas = await DuaCollection.find(filter).sort({ order: 1 });
    res.json({ status: 'success', results: duas.length, data: { duas } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET dua by ID
router.get('/:id', async (req, res) => {
  try {
    const dua = await DuaCollection.findById(req.params.id);
    if (!dua) return res.status(404).json({ status: 'fail', message: 'Dua not found' });
    res.json({ status: 'success', data: { dua } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create dua (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { title, arabicTitle, arabicText, transliteration, translations, reference, category, audioUrl, isActive, order } = req.body;
    const dua = await DuaCollection.create({
      title, arabicTitle, arabicText, transliteration, translations, reference, category, audioUrl, isActive, order
    });
    res.status(201).json({ status: 'success', data: { dua } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update dua (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const dua = await DuaCollection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dua) return res.status(404).json({ status: 'fail', message: 'Dua not found' });
    res.json({ status: 'success', data: { dua } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE dua (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const dua = await DuaCollection.findByIdAndDelete(req.params.id);
    if (!dua) return res.status(404).json({ status: 'fail', message: 'Dua not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
