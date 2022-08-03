const router = require('express').Router();
const routerUser = require('./users');
const routerMovie = require('./movie');
const { validatorSignInData, validatorSignUpData } = require('../middlewares/validator');
const { login, createUser, signout } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validatorSignInData, login);
router.post('/signup', validatorSignUpData, createUser);

router.get('/signout', signout);

router.use(auth);
router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.use('*', () => {
    throw new NotFoundError('Некорректный путь');
});

module.exports = router;