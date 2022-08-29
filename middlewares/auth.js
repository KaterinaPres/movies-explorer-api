const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/NotAutorization');

// const { NEED_AUTHORISATION } = require('../errors/error-constunts');
const NEED_AUTHORISATION  = 401;

const { JWT_SECRET_DEV } = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new UnauthorizedError(NEED_AUTHORISATION);
  }

  let payload;

  try {
    payload = jwt.verify(req.cookies.jwt, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorizedError(NEED_AUTHORISATION);
  }
  req.user = payload;

  next();
};