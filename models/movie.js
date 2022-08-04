const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { regUrl } = require('../token/MongoError');

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
        type: Number,
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
        match: [regUrl, 'Некорректно введен URL'],
    },
    trailerLink: {
        type: String,
        required: true,
        match: [regUrl, 'Некорректно введен URL'],
    },
    thumbnail: {
        type: String,
        required: true,
        match: [regUrl, 'Некорректно введен URL'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movie',
        required: true,
    },
    // movieId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'user',
    //     required: true,
    // },
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