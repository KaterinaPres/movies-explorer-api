const bcrypt = require('bcrypt');
// const validator = require('validator');
const userMy = require('../models/user');
const { generateToken } = require('../token/jwt');
const { MONGO_ERROR } = require('../token/MongoError');
const BadError = require('../errors/BadError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const Conflict = require('../errors/Conflict'); // 409

// module.exports.updateAvatar = (req, res, next) => {
//   const { avatar } = req.body;
//   userMy.findByIdAndUpdate(
//     req.user._id,
//     { avatar },
//     { new: true, runValidators: true, upsert: false },
//   )
//     .then((user) => {
//       if (!user) {
//         next(new NotFoundError('Пользователь по указанному _id не найден'));
//         return;
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError' || err.name === 'CastError') {
//         next(new BadError('Переданы некорректные данные при обновлении аватара'));
//         return;
//       }
//       next(err);
//     });
// };

module.exports.getUsers = (req, res, next) => {
  userMy.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
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

// module.exports.getUserByID = (req, res, next) => {
//   userMy.findById(req.params.userId)
//     .orFail(() => new NotFoundError('Пользователь с указанным _id не найдена'))
//     .then((user) => { res.send(user); })
//     .catch((err) => {
//       if (err.name === 'CastError') {
//         next(new BadError('Переданы некорректные данные'));
//         return;
//       }
//       next(err);
//     });
// };

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  userMy.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, upsert: false },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному _id не найден'));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadError('Переданы некорректные данные при обновлении пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userMy.findUser(email, password)
    .then((user) => {
      const token = generateToken({ _id: user._id });
      res.send({
        message: 'Проверка прошла успешно!',
        token,
      });
    })
    .catch(next);
};

// module.exports.getUserMe = (req, res, next) => {
//   userMy.findById(req.user._id)
//     .then((user) => res.status(200).send(user))
//     .catch(next);
// };

module.exports.signout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Вы успешно вышли' });
  } catch (err) {
    next(err);
  }
};