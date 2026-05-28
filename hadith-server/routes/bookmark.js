const express = require('express');
const jwt = require('jsonwebtoken');
const Bookmark = require('../models/Bookmark');

const router = express.Router();

// User auth middleware (non-admin)
function userAuth(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.user = decoded.user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

// GET all bookmarks for the authenticated user
router.get('/', userAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const bookmarks = await Bookmark.find({ userId })
      .populate({
        path: 'hadithId',
        populate: { path: 'hadithTypeId' }
      })
      .sort({ createdAt: -1 });
    res.json({ status: 'success', results: bookmarks.length, data: { bookmarks } });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

// POST create bookmark for the authenticated user
router.post('/', userAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { hadithId } = req.body;
    if (!hadithId) {
      return res.status(400).json({ status: 'fail', message: 'hadithId is required' });
    }

    // Check if bookmark already exists
    const existing = await Bookmark.findOne({ userId, hadithId });
    if (existing) {
      return res.status(200).json({ status: 'success', message: 'Already bookmarked', data: { bookmark: existing } });
    }

    const bookmark = await Bookmark.create({ userId, hadithId });
    res.status(201).json({ status: 'success', data: { bookmark } });
  } catch (err) {
    // Handle duplicate key error from the unique index as a fallback
    if (err.code === 11000) {
      return res.status(200).json({ status: 'success', message: 'Already bookmarked' });
    }
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE bookmark by hadithId for the authenticated user
router.delete('/:hadithId', userAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { hadithId } = req.params;
    const bookmark = await Bookmark.findOneAndDelete({ userId, hadithId });
    if (!bookmark) return res.status(404).json({ status: 'fail', message: 'Bookmark not found' });
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
