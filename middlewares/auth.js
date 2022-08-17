const { checkToken } = require('../token/jwt');
const NotAutorization = require('../errors/NotAutorization'); // 401

module.exports = (req, res, next) => {
  const authMy = req.headers.authorization;
  const match = authMy ? authMy.match(/Bearer\s+(.*)$/) : false;
  if (!match) {
    throw new NotAutorization('Авторизуйтесь для доступа');
  }
  let payload;
  try {
    payload = checkToken(match[1]);
  } catch (err) {
    throw new NotAutorization('Авторизуйтесь для доступа');
  }
  req.user = { _id: payload._id };
  next();
};
