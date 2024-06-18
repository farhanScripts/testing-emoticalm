const express = require('express');

const router = express.Router();
const mainController = require('../controllers/mainControllers');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', mainController.home);
router.get('/my', isAuthenticated, mainController.myHomePage);

module.exports = router;
