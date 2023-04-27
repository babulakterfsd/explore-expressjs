const express = require('express');
const { sendeMail } = require('../../controllers/mail.controller');

const router = express.Router();
router.route('/').post(sendeMail);

module.exports = router;
