const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes pour les dentistes
router.get('/users', adminController.getPendingUsers);
router.put('/users/:id/approve', adminController.approveUser);

// Routes pour les annonces
router.get('/listings', adminController.getAllListingsAdmin);
router.put('/listings/:id/approve', adminController.approveListing);

module.exports = router;