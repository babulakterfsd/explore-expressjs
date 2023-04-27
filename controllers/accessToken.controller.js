const jwt = require('jsonwebtoken');

module.exports.getAccessToken = (req, res) => {
    const userEmail = req.body;
    const accessToken = jwt.sign(userEmail, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });
    res.send({ accessToken });
};
