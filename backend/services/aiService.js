const axios = require('axios');
const logger = require('../utils/logger'); // Adjust path based on your structure

class AIService {
  constructor() {
    this.baseURL = process.env.AI_SERVICE_URL || 'http://localhost:8002';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  /**
   * Sync health log to AI service memory
   * @param {string} userId - User ID
   * @param {object} logData - Health log data (aqi, risk, location)
   * @returns {Promise<object>} Response from AI service
   */
async syncHealthMemory(userId, logData) {
    try {
      // 1. MAP RISK STRINGS: FastAPI expects {"low", "moderate", "high", "very_high", "hazardous"}
      const riskMap = {
        "Low Risk": "low",
        "Moderate Risk": "moderate",
        "High Risk": "high",
        "Very High Risk": "very_high",
        "Hazardous": "hazardous",
        "Good": "low", // Just in case your AQICard uses these terms
        "Moderate": "moderate",
        "Unhealthy": "high"
      };

      // 2. NORMALIZE PAYLOAD: Ensure types match Pydantic (float, string, string)
      const standardizedPayload = {
        user_id: String(userId),
        log_data: {
          aqi: parseFloat(logData.aqi) || 0,
          risk: riskMap[logData.risk] || "moderate", // Default to moderate if mapping fails
          location: String(logData.location || "Unknown")
        }
      };

      const response = await this.client.post('/sync', standardizedPayload);
      
      logger.info(`Health memory synced for user: ${userId}`);
      return response.data;
    } catch (error) {
      // Improved error logging to see FastAPI's specific validation detail
      const detail = error.response?.data?.detail || error.message;
      logger.error(`Failed to sync health memory: ${JSON.stringify(detail)}`);
      throw new Error(`AI Service sync failed: ${error.message}`);
    }
  }

  /**
   * Send user query to health assistant
   * @param {string} userId - User ID
   * @param {string} message - User message/query
   * @returns {Promise<object>} Response with assistant reply and sources
   */
  async askHealthAssistant(userId, message) {
    try {
      const response = await this.client.post('/chat', {
        user_id: userId,
        message: message
      });
      logger.info(`Health assistant query processed for user: ${userId}`);
      return response.data;
    } catch (error) {
      logger.error(`Failed to get assistant response: ${error.message}`);
      throw new Error(`AI Service chat failed: ${error.message}`);
    }
  }

  /**
   * Check AI service health
   * @returns {Promise<object>} Health status
   */
  async healthCheck() {
    try {
      const response = await this.client.get('/health');
      return response.data;
    } catch (error) {
      logger.error(`AI Service health check failed: ${error.message}`);
      throw new Error(`AI Service is unavailable`);
    }
  }
}

module.exports = new AIService();
