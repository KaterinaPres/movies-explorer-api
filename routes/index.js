const router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movie');
const { validatorSignInData, validatorSignUpData } = require('../middlewares/validator');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validatorSignInData, login);
router.post('/signup', validatorSignUpData, createUser);

router.use(auth);
router.use(routerUser);
router.use(routerMovie);
router.use((req, res, next) => next(new NotFoundError('Некорректный путь')));

module.exports = router;
