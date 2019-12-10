const express = require('express');
const { homeController } = require('../../controllers');

const router = express.Router();

router.get('/', homeController.getApiInformation);
router.get('/health', homeController.getHealth);

module.exports = {
    path: '/',
    router
};
