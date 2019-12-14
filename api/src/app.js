const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const { defaultErrorHandler } = require('./middlewares');

const app = express();
app.use(logger('dev'));
app.use(cors({ exposedHeaders: ['token', 'refresh-token'] }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.disable('etag');

routes.forEach(({ path, router }) => {
  app.use(path, router);
});

app.use(defaultErrorHandler);

module.exports = app;
