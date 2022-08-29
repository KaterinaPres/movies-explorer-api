const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 2 * 60 * 1000, 
  max: 1000, 
  standardHeaders: true, 
  legacyHeaders: false, 
});
