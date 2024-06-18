const express = require('express');

const router = express.Router();
const calendarController = require('../controllers/calendarControllers');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, calendarController.getCalendar);

module.exports = router;
