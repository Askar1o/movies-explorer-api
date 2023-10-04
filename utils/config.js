const rateLimit = require('express-rate-limit');

const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_DB || 'mongodb://0.0.0.0:27017/bitfilmsdb';
const MONGO_OPTIONS = {
  useNewUrlParser: true,
};

const LIMITER = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = {
  SECRET,
  LIMITER,
  PORT,
  MONGO,
  MONGO_OPTIONS,
};
