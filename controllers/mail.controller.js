const shootMail = require('../utils/sendMail');

module.exports.sendeMail = (req, res) => {
    const mailData = req.body;
    shootMail(mailData);
    res.send(mailData);
};
