const router = require('express').Router();
const { validatorMovie, validatorMovieId } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.post('/movies', validatorMovie, createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:_id', validatorMovieId, deleteMovie);

module.exports = router;
