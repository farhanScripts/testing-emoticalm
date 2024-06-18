const express = require('express');

const router = express.Router();
const forumController = require('../controllers/forumControllers');
const { isAuthenticated } = require('../middleware/isAuthenticated');

router.get('/', isAuthenticated, forumController.getForumPage);

module.exports = router;
