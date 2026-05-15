const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Organization = require('../models/Organization');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `org_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

// GET all organizations
router.get('/', async (req, res) => {
  try {
    const orgs = await Organization.find().sort({ featured: -1, createdAt: -1 });
    res.json({ status: 'success', data: { organizations: orgs } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET single organization
router.get('/:id', async (req, res) => {
  try {
    const org = await Organization.findById(req.params.id);
    if (!org) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { organization: org } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// POST create organization (with optional QR image)
router.post('/', upload.single('qrImage'), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.qrImage = req.file.filename;
    data.isActive = data.isActive === 'true' || data.isActive === true;
    data.featured = data.featured === 'true' || data.featured === true;
    const org = await Organization.create(data);
    res.status(201).json({ status: 'success', data: { organization: org } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// PUT update organization
router.put('/:id', upload.single('qrImage'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.qrImage = req.file.filename;
    updates.isActive = updates.isActive === 'true' || updates.isActive === true;
    updates.featured = updates.featured === 'true' || updates.featured === true;
    const org = await Organization.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!org) return res.status(404).json({ status: 'fail', message: 'Not found' });
    res.json({ status: 'success', data: { organization: org } });
  } catch (err) {
    res.status(400).json({ status: 'error', message: err.message });
  }
});

// DELETE organization
router.delete('/:id', async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ status: 'success', data: null });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;
