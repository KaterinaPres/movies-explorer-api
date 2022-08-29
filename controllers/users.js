const bcrypt = require('bcrypt');
const userMy = require('../models/user');
const { generateToken } = require('../token/jwt');
const { MONGO_ERROR } = require('../token/MongoError');
const BadError = require('../errors/BadError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const Conflict = require('../errors/Conflict'); // 409
const NotAutorization = require('../errors/NotAutorization');

module.exports.getCurrentUser = (req, res, next) => {
  userMy.findById(req.user._id)
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => userMy.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, email: user.email,
    }))
    .catch((err) => {
      if (err.code === MONGO_ERROR) {
        next(new Conflict(Conflict.message));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadError('Переданы некорректные данные при создании пользователя'));
        return;
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  userMy.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true, upsert: false },
  )
    .orFail(new NotFoundError('Пользователь по указанному _id не найден'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === MONGO_ERROR) {
        next(new Conflict('Пользователь с таким email уже существует'));
        return;
      }
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadError('Переданы некорректные данные при обновлении пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new NotAutorization('Не передан емейл или пароль'));
    return;
  }
  userMy.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NotAutorization('Неверный email или пароль');
      }

      return Promise.all([
        user,
        bcrypt.compare(password, user.password),
      ]);
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new NotAutorization('Неверный email или пароль');
      }

      return generateToken({ _id: user._id });
    })
    .then((token) => {
      
    
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,//'none',
        secure: false,//NODE_ENV === 'production', // Postman - Secure - If present, the cookie is only sent when the URL begins with https:// and won't be sent over an insecure connection.
      })
      .send({ message: 'Вы успешно авторизованы' });
      // res.send({ token });
    })
    .catch(next);
};

module.exports.signout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Вы успешно вышли' });
  } catch (err) {
    next(err);
  }
};
