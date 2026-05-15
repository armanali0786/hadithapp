const express = require('express');
const multer = require('multer');
const path = require('path');
const Slider = require('../models/Slider');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// GET all sliders
router.get('/', async (req, res) => {
  try {
    const sliders = await Slider.find({}).sort({ order: 1 });
    res.json({ status: 'success', data: { sliders } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// GET single slider
router.get('/:id', async (req, res) => {
  try {
    const slider = await Slider.findById(req.params.id);
    if (!slider) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { slider } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// POST create slider
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, order, isActive } = req.body;
    const image = req.file ? req.file.filename : null;
    const slider = await Slider.create({ title, description, image, order, isActive });
    res.status(201).json({ status: 'success', data: { slider } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// PUT update slider
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = req.file.filename;
    const slider = await Slider.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!slider) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { slider } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

// DELETE slider
router.delete('/:id', async (req, res) => {
  try {
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
});

module.exports = router;
