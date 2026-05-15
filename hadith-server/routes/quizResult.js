const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const QuizResult = require('../models/QuizResult');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Submit quiz result (authenticated)
router.post('/', authenticate, async (req, res) => {
  try {
    const { setId, setTitle, score, totalQuestions } = req.body;
    const user = await User.findById(req.user.user.id).select('name');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const percentage = Math.round((score / totalQuestions) * 100);
    const result = await QuizResult.create({
      userId: req.user.user.id,
      userName: user.name,
      setId,
      setTitle,
      score,
      totalQuestions,
      percentage,
    });
    res.status(201).json({ status: 'success', data: { result } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// Get leaderboard — top 10 users by best percentage (optionally filtered by setId)
router.get('/leaderboard', async (req, res) => {
  try {
    const { setId } = req.query;
    const match = setId && mongoose.Types.ObjectId.isValid(setId)
      ? { setId: new mongoose.Types.ObjectId(setId) }
      : {};

    const leaderboard = await QuizResult.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$userId',
          userName: { $first: '$userName' },
          bestPercentage: { $max: '$percentage' },
          bestScore: { $max: '$score' },
          attempts: { $sum: 1 },
          lastPlayed: { $max: '$completedAt' },
        },
      },
      { $sort: { bestPercentage: -1, lastPlayed: 1 } },
      { $limit: 10 },
    ]);

    res.json({ status: 'success', data: { leaderboard } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get current user's quiz history
router.get('/my', authenticate, async (req, res) => {
  try {
    const results = await QuizResult.find({ userId: req.user.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json({ status: 'success', data: { results } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
