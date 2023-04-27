const express = require('express');

const router = express.Router();
const paymentController = require('../../controllers/payment.controller');

// get client secret from backend via payment intent post api
router.route('/').post(paymentController.getClientSecret);

module.exports = router;
