const router = require('express').Router();
const { validatorMovie, validatorMovieId } = require('../middlewares/validator');
const { getMovie, createMovie, deleteMovie } = require('../controllers/movie');

router.get('/movies', getMovie);
router.post('/movies', validatorMovie, createMovie);
router.delete('/movies/:_id', validatorMovieId, deleteMovie);

module.exports = router;