// Vercel serverless function entry point.
const dotenv = require('dotenv');

// Load environment variables (for local testing)
// In production, Vercel sets these from dashboard configuration
dotenv.config();

module.exports = require('../app');