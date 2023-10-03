require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const handleErrors = require('./errors/handleErrors');
const {
  LIMITER, PORT, MONGO, MONGO_OPTIONS
} = require('./utils/config');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect(MONGO, MONGO_OPTIONS);

app.use(express.json());
app.use(cookieParser());

app.use(helmet());
app.use(LIMITER);

app.use(
  cors({
    origin: [
      'http://localhost:4001',
      'https://askario.diplom.nomoredomainsrocks.ru',
    ],
    credentials: true,
  })
);

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
