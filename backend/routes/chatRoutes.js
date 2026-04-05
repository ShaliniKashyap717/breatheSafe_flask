const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * POST /chat
 * Send message to health assistant
 * Protected by authentication middleware
 */
router.post('/', authMiddleware, handleChat);

module.exports = router;
