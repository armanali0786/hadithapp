const express = require('express');
const CardList = require('../models/CardList');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDirectory = path.join(__dirname, '../public/assets');
if (!fs.existsSync(uploadsDirectory)) {
    fs.mkdirSync(uploadsDirectory);
}

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDirectory); // Use the uploads directory we created
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname); // Use a unique filename to prevent overwriting
    }
});

const upload = multer({ storage: storage });

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, '../public')));

// POST endpoint to handle form submission including file upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { description, price } = req.body;
        // Ensure both description and price are provided
        if (!description || !price) {
            throw new Error('Description and price are required');
        }

        // Ensure image file is uploaded
        if (!req.file) {
            throw new Error('Image file is required');
        }

        const newCardList = await CardList.create({
            description,
            price,
            image: '/assets/' + req.file.filename // Store relative file path in database
        });

        res.status(201).json({
            status: 'success',
            data: {
                cardList: newCardList
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message // Return error message
        });
    }
});



// GET endpoint to retrieve all card lists
router.get('/', async (req, res) => {
    try {
        const cards = await CardList.find({});
        res.status(200).json({
            status: 'success',
            results: cards.length,
            data: {
                cards
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve card lists',
            error: error.message
        });
    }
});


module.exports = router;
