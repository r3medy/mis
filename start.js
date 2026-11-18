/*
 * Changes made / issues previously found:
 * - Was an un-awaited IIFE, so part1.js had no way to know when the connection was ready
 * - global.db was set but never used (models use the mongoose connection directly)
 * - Now exports the connection promise so part1.js can await it
 */
const mongoose = require('mongoose');
require('dotenv').config();

// changed: export the connection promise instead of running an un-awaited IIFE
module.exports = mongoose.connect(process.env.MONGO_AUTH).then(() => {
    console.log('Connected to MongoDB');
});
