const express = require('express');
const jwt = require('jsonwebtoken');
const IslamicQuote = require('../models/IslamicQuote');

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

// GET all quotes
// Optional: ?featured=true, ?active=true, ?category=<value>
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.active === 'true') filter.isActive = true;
    if (req.query.category) filter.category = req.query.category;
    const quotes = await IslamicQuote.find(filter).sort({ createdAt: -1 });
    res.json({ status: 'success', results: quotes.length, data: { quotes } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET one random active quote — MUST be defined before /:id
router.get('/random', async (req, res) => {
  try {
    const result = await IslamicQuote.aggregate([
      { $match: { isActive: true } },
      { $sample: { size: 1 } }
    ]);
    if (!result.length) {
      return res.status(404).json({ status: 'fail', message: 'No active quotes found' });
    }
    res.json({ status: 'success', data: { quote: result[0] } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET quote by ID
router.get('/:id', async (req, res) => {
  try {
    const quote = await IslamicQuote.findById(req.params.id);
    if (!quote) return res.status(404).json({ status: 'fail', message: 'Quote not found' });
    res.json({ status: 'success', data: { quote } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create quote (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { arabicText, translationText, author, authorTitle, isActive, isFeatured, category } = req.body;
    const quote = await IslamicQuote.create({ arabicText, translationText, author, authorTitle, isActive, isFeatured, category });
    res.status(201).json({ status: 'success', data: { quote } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update quote (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const quote = await IslamicQuote.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!quote) return res.status(404).json({ status: 'fail', message: 'Quote not found' });
    res.json({ status: 'success', data: { quote } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE quote (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const quote = await IslamicQuote.findByIdAndDelete(req.params.id);
    if (!quote) return res.status(404).json({ status: 'fail', message: 'Quote not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
