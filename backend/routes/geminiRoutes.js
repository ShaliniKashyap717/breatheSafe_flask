const express = require('express');
const router = express.Router();
const { getAqiInsightsFromBackend } = require('../controllers/geminiController');

router.get('/', getAqiInsightsFromBackend);

module.exports = router;
