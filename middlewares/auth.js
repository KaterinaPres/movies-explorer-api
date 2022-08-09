const { checkToken } = require('../token/jwt');
const NotAutorization = require('../errors/NotAutorization'); // 401

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  // const authMy = req.headers.authorization;
  // const match = authMy ? authMy.match(/Bearer\s+(.*)$/) : false;
  if (!token) {
    throw new NotAutorization('Авторизуйтесь для доступа');
  }
  let payload;
  try {
    payload = checkToken(token);
    User.findOne({ _id: payload._id })
    .then((user) => {
      if (!user) {
        throw new NotAutorization('Авторизуйтесь для доступа');
      }
      req.user = { _id: user._id };
      next();
    })
    .catch(next);
} catch (err) {
  next(new NotAutorization('Авторизуйтесь для доступа'));
}
};