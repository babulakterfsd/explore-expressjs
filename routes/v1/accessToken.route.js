const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.route('/')
  .post(async (req, res) => {
    console.log(req.body);
    const userEmail = req.body;
    const accessToken = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });
    res.send({ accessToken });
  })

module.exports = router;