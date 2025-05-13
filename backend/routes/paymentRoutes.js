const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { validateDonationData } = require('../middleware/validation');

// Payment routes
router.post('/create-order', validateDonationData, paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);
router.get('/donation-history', paymentController.getDonationHistory);

module.exports = router;
