const express = require('express');

const router = express.Router();
const shootMail = require('../../utils/sendMail');

  router.route('/')
  .get((req, res) => {
    res.send('getting email');
  })
  .post((req, res) => {
    const mailData = req.body;
    shootMail(mailData);
    res.send(mailData);
  })

module.exports = router;