const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { updateUser, getCurrentUser } = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email({ minDomainSegments: 1, tlds: { allow: false } }),
        name: Joi.string().required().trim().min(2)
            .max(30),
    }),
}), updateUser);

module.exports = router;