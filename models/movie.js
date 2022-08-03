const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { default: isEmail } = require('validator/lib/isEmail');
const { regUrl } = require('../token/MongoError');
const isURL = require('validator/lib/isURL');

const movieSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true,
        default: 'Россия',
    },
    director: {
        type: String,
        required: true,
        default: 'Индар Джендубаев',
    },
    duration: {
        type: number,
        required: true,
    },
    year: {
        type: String,
        required: true,
        default: '2015',
    },
    description: {
        type: String,
        required: true,
        default: 'фильм',
    },
    image: {
        type: String,
        required: true,
        validator: {
            validate: {
                validator: (v) => isURL(v),
                match: [regUrl, 'Необходимо заполнить действительный URL-адрес'],
            },
        },
    },
    trailerLink: {
        type: String,
        required: true,
        validator: {
            validate: {
                validator: (v) => isURL(v),
                match: [regUrl, 'Необходимо заполнить действительный URL-адрес'],
            },
        },
    },
    thumbnail: {
        type: String,
        required: true,
        validator: {
            validate: {
                match: [regUrl, 'Необходимо заполнить действительный URL-адрес'],
            },
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true,
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    nameRU: {
        type: String,
        required: true,
        default: 'Он-Дракон',
    },
    nameEN: {
        type: String,
        required: true,
        default: 'Россия',
    },
});

module.exports = mongoose.model('movies', movieSchema);