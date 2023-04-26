const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
    const authHeader = req?.headers?.authorization;
    if (!authHeader) {
      console.log('auth not found ');
      return res.status(401).send({ message: "Unauthorized Access" });
    } else {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .send({ message: "Invalid Token, Forbidden Access" });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  };

module.exports = verifyJWT;