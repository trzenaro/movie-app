const express = require('express');
const { authenticationController } = require('../../controllers');

const router = express.Router();

router.post('/login', authenticationController.login);

module.exports = {
  path: '/auth',
  router,
};
