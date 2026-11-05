const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route pour s'inscrire
router.post('/register', userController.registerUser);

// NOUVEAU : Route pour se connecter
router.post('/login', userController.loginUser);

// Route pour voir la liste des utilisateurs
router.get('/', userController.getAllUsers);

module.exports = router;