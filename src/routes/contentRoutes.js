const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Route pour publier du contenu (POST)
router.post('/', contentController.createContent);

// Route pour voir tout le contenu (GET)
router.get('/', contentController.getAllContent);

module.exports = router;