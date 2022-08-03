const router = require('express').Router();
const { validatorMovie, validatorMovieId } = require('../middlewares/validator');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovies);
router.post('/movies', validatorMovie, createMovie);
router.delete('/movies/:_id', validatorMovieId, deleteMovie);

module.exports = router;