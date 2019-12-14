const HttpStatus = require('http-status-codes');
const { CustomError, ValidationError } = require('../utils/error-types');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(HttpStatus.BAD_REQUEST).send(err.getErrorObject());
  } else if (err instanceof CustomError) {
    if (err.code.toLowerCase().indexOf('unauthorized') > -1) {
      res.status(HttpStatus.FORBIDDEN).send({ code: err.code, message: err.message });
    } else if (err.code.toLowerCase().indexOf('not_found') > -1) {
      res.status(HttpStatus.NOT_FOUND).send({ code: err.code, message: err.message });
    } else {
      res.status(HttpStatus.BAD_REQUEST).send({ code: err.code, message: err.message });
    }
  } else {
    console.error(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
  }
};
