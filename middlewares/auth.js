const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET } = require('../utils/config');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payloud;

  try {
    payloud = jwt.verify(
      token,
      SECRET
    );
    req.user = payloud;
    next();
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация'));
  }
};
