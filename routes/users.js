const router = require('express').Router();
const { updateUser, getUsers } = require('../controllers/users');
const { validatorUserData } = require('../middlewares/validator');

router.get('/users/me', getUsers);
router.patch('/users/me', validatorUserData, updateUser);

module.exports = router;
