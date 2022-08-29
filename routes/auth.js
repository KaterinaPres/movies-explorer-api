const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createUser, login, signout } = require('../controllers/users');

router.post('/signup', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: false } }),
        password: Joi.string().required().min(5),
        name: Joi.string().trim().required().min(2)
            .max(30),
    }),
}), createUser);

router.post('/signin', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: false } }),
        password: Joi.string().required(),
    }),
}), login);

router.post('/signout', signout);

module.exports = router;