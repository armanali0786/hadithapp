const express = require('express')
const HadithList = require('../models/HadithList')
const multer = require('multer');
const path = require('path');

const router = express.Router();


// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Adjust path as needed
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  try {
    const hadithlist = await HadithList.find({});
    res.json({
      status: 'success',
      results: hadithlist.length,
      data: {
        hadithlist
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// Example: GET /hadith-list?hadithTypeId=yourId
router.get('/filter', async (req, res) => {
  const { hadithTypeId } = req.query; // Get the query parameter
  try {
    const filter = hadithTypeId ? { hadithTypeId } : {};
    const hadithList = await HadithList.find(filter);
    res.json({
      status: 'success',
      data: {
        hadithList
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});


// ****************************
router.post('/', upload.single('HadithImage'), async (req, res) => {
  try {
    const { HadithTitle, HadithName, HadithDescription, Date, hadithTypeId } = req.body;

    // Check required fields
    if (!HadithTitle || !HadithDescription || !hadithTypeId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: HadithTitle, HadithDescription, and hadithTypeId'
      });
    }

    // Get the filename of the uploaded image (if present)
    const HadithImage = req.file ? req.file.filename : null;

    // Create new Hadith entry
    const newHadith = await HadithList.create({
      HadithImage,
      HadithTitle,
      HadithName,
      HadithDescription,
      Date,
      hadithTypeId
    });

    res.status(201).json({
      status: 'success',
      data: {
        hadith: newHadith
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Capture the ID from the URL

  try {
    // Find the Hadith by ID
    const hadith = await HadithList.findById(id);
    
    // If no Hadith is found, return an error
    if (!hadith) {
      return res.status(404).json({
        status: 'fail',
        message: 'Hadith not found'
      });
    }

    res.json({
      status: 'success',
      data: {
        hadith
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});

// POST endpoint to create a new Hadith
router.post('/', upload.single('HadithImage'), async (req, res) => {
  try {
    const { HadithTitle, HadithName, HadithDescription, Date, hadithTypeId } = req.body;

    // Check required fields
    if (!HadithTitle || !HadithDescription || !hadithTypeId) {
      return res.status(400).json({
        status: 'fail',
        message: 'Missing required fields: HadithTitle, HadithDescription, and hadithTypeId'
      });
    }

    // Get the filename of the uploaded image (if present)
    const HadithImage = req.file ? req.file.filename : null;

    // Create new Hadith entry
    const newHadith = await HadithList.create({
      HadithImage,
      HadithTitle,
      HadithName,
      HadithDescription,
      Date,
      hadithTypeId
    });

    res.status(201).json({
      status: 'success',
      data: {
        hadith: newHadith
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
});


module.exports = router
