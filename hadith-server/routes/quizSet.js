const express = require('express');
const router = express.Router();
const QuizSet = require('../models/QuizSet');

router.get('/', async (req, res) => {
  try {
    const sets = await QuizSet.find().populate('questions').sort({ createdAt: -1 });
    res.json({ status: 'success', data: { sets } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const set = await QuizSet.findById(req.params.id).populate('questions');
    if (!set) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { set } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const set = await QuizSet.create(req.body);
    res.status(201).json({ status: 'success', data: { set } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const set = await QuizSet.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('questions');
    if (!set) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { set } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await QuizSet.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
