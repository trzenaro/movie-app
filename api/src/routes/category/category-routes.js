const express = require('express');
const { categoryController } = require('../../controllers');
const { authentication } = require('../../middlewares');
const router = express.Router();

router.use(authentication);
router.get('/', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.post('/', categoryController.addCategory);
router.put('/:categoryId', categoryController.updateCategoryById);

module.exports = {
    path: '/categories',
    router
};
