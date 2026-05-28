const express = require('express');
const jwt = require('jsonwebtoken');
const Tag = require('../models/Tag');

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

// GET all active tags, sorted by order
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.find({ isActive: true }).sort({ order: 1 });
    res.json({ status: 'success', results: tags.length, data: { tags } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// GET tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) return res.status(404).json({ status: 'fail', message: 'Tag not found' });
    res.json({ status: 'success', data: { tag } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create tag (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, color, description, isActive, order } = req.body;
    // Auto-generate slug from name
    const slug = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const tag = await Tag.create({ name, slug, color, description, isActive, order });
    res.status(201).json({ status: 'success', data: { tag } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ status: 'fail', message: 'Tag name or slug already exists' });
    }
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update tag (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const updates = { ...req.body };
    // Regenerate slug if name is being updated
    if (updates.name) {
      updates.slug = updates.name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    const tag = await Tag.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!tag) return res.status(404).json({ status: 'fail', message: 'Tag not found' });
    res.json({ status: 'success', data: { tag } });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ status: 'fail', message: 'Tag name or slug already exists' });
    }
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE tag (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return res.status(404).json({ status: 'fail', message: 'Tag not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
