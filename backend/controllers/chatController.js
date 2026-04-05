const aiService = require('../services/aiService');
const logger = require('../utils/logger');

/**
 * Handle chat request from user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 */
const handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id || req.userId; // Adjust based on your auth middleware

    // Validate input
    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid message format'
      });
    }

    if (message.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Message cannot be empty'
      });
    }

    // Call AI service
    const assistantResponse = await aiService.askHealthAssistant(userId, message);

    // Return response to frontend
    return res.status(200).json({
      status: 'success',
      data: {
        response: assistantResponse.response,
        sources_found: assistantResponse.sources_found
      }
    });
  } catch (error) {
    logger.error(`Chat handler error: ${error.message}`);
    
    // Handle specific error types
    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        status: 'error',
        message: 'Service rate limit exceeded. Please try again later.'
      });
    }

    if (error.message.includes('unavailable')) {
      return res.status(503).json({
        status: 'error',
        message: 'AI service is currently unavailable'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Failed to process chat request'
    });
  }
};

module.exports = {
  handleChat
};
