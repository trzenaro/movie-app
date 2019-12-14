const express = require('express');
const { userController } = require('../../controllers');
const { authentication } = require('../../middlewares');

const router = express.Router();

router.use(authentication);
router.get('/', userController.getUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.addUser);
router.put('/:userId', userController.updateUserById);

module.exports = {
  path: '/users',
  router,
};
