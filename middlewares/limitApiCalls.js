/* this middleware is used to limit the number of requests to the api to 1 per minute */

const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
module.exports = limiter;
