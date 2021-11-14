import express from 'express';
import xss from 'xss-clean';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';

import config from './config/config';
import morgan from './config/morgan';
// import authLimiter from'./middlewares/rateLimiter');
import routes from './routes/v1';
import { errorConverter, errorHandler } from './middlewares/error';
import ApiError from './utils/ApiError';

// require('./libs/agenda');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/auth', authLimiter);
// }

// v1 api routes
app.use('', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
// module.exports = app;
