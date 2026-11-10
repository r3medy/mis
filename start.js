// Importing mongoose (MongoDB ODP), dotenv for .env
const mongoose = require('mongoose');
require('dotenv').config();

// Connecting to database using IIFE
(async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGO_AUTH);
        global.db = connection.db;
        console.log('Connected to MongoDB');
    } catch(e) {
        console.error(e);
        process.exit(1);
    }
})();
