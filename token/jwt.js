const jwt = require('jsonwebtoken');

const { NODE_ENV = 'production', JWT_SECRET = 'secret' } = process.env;

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });

const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');

module.exports = { generateToken, checkToken };
