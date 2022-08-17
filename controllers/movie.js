const Movie = require('../models/movie');
const BadError = require('../errors/BadError'); // 400
const NotFoundError = require('../errors/NotFoundError'); // 404
const ForbiddenError = require('../errors/ForbiddenError'); // 403
const { MONGO_ERROR } = require('../token/MongoError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id }, null, { sort: { _id: -1 } })
    .orFail(new NotFoundError('Сохраненных пользователем фильмов нет'))
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.code === MONGO_ERROR) {
        next(new BadError('Переданы некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (req.user._id !== movie.owner.toString()) {
        throw new ForbiddenError('Нельзя удалить фильм из избранного, так как он создан другим пользователем');
      }
      return movie.remove();
    })
    .then(() => {
      res.send({ message: 'Фильм удален' });
    })
    .catch(next);
};
