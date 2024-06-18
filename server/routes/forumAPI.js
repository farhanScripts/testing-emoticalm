const express = require('express');

const router = express.Router();
const forumController = require('../controllers/forumControllers');

router.post('/', forumController.postForum);
router.get('/', forumController.getForum);
router.post('/:id/replies', forumController.replyForum);
module.exports = router;
