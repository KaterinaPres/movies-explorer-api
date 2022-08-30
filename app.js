// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');
// const helmet = require('helmet');
// const { errors } = require('celebrate');
// const { requestLog, errorLog } = require('./middlewares/logger');
// const { limiter } = require('./middlewares/rateLimit');
// const MONGO_URL = require('./token/BD');

// const { PORT = 3001 } = process.env;
// const app = express();

// const options = {
//   origin: [
//     'http://localhost:3001',
//     'https://filmskaterinapres.nomoredomains.xyz',
//     'https://api.filmskaterinapres.nomoredomains.xyz',
//     'http://filmskaterinapres.nomoredomains.xyz',
//     'http://api.filmskaterinapres.nomoredomains.xyz',
//     'https://KaterinaPres.github.io',
//   ],
//   credentials: true,
// };

// mongoose.connect(MONGO_URL);
// app.use(requestLog);
// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });
// app.use(limiter);
// app.use(helmet());
// app.use('*', cors(options)); // Подключаем первой миддлварой
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(require('./routes/index'));

// app.use(errorLog); // подключаем логгер ошибок
// app.use(errors()); // обработчик ошибок celebrate
// app.use((err, req, res, next) => {
//   if (err.statusCode) {
//     return res.status(err.statusCode).send({ message: err.message });
//   }

//   res.status(500).send({ message: 'Что-то пошло не так!' });
//   return next();
// });

// app.listen(PORT);

// module.exports = app;
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorsHandler = require('./middlewares/errorsHandler');
const { limiter } = require('./middlewares/rateLimit');
const NotFoundError = require('./errors/NotFoundError');

//const { ROUTE_NOT_FOUND } = require('./errors/error-constunts');

const { DB_URL } = require('./helpers/constants');

const { NODE_ENV, DB, PORT = 3001 } = process.env;

const app = express();

const options = {
  origin: [
    'http://localhost:3000',
        'https://filmskaterinapres.nomoredomains.sbs',
        'https://api.filmskaterinapres.nomoredomains.sbs',
        'https://KaterinaPres.github.io',
  ],
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type" , "Referer", "User-Agent", "Accept", "Accept-Encoding","Host","Origin", "Accept-Language"]
};

app.use('*', cors(options));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(NODE_ENV === 'production' ? DB : DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);

app.use(require('./routes/index'));

app.use(() => {
  throw new NotFoundError(404);
});

app.use(errorLogger);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);