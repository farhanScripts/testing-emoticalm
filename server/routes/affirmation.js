const express = require('express');
const router = express.Router();
const { getAffirmation } = require('../controllers/affirmationController');

router.get('/api/affirmation', async (req, res) => {
  try {
    const affirmation = await getAffirmation();
    res.json({ affirmation });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;