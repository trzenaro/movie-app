const express = require('express');
const { itemController } = require('../../controllers');
const { authentication } = require('../../middlewares');

const router = express.Router();

router.use(authentication);
router.get('/', itemController.getItems);
router.get('/:itemId', itemController.getItemById);
router.post('/', itemController.addItem);
router.put('/:itemId', itemController.updateItemById);

module.exports = {
  path: '/items',
  router,
};
