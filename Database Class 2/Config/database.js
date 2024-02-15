// importing mongoose
const mongoose = require('mongoose');

// importing .env data using dotenv
require('dotenv').config()

// creating async function which connects to database
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database connection established")
    }
    catch (err) {
        console.log("Error connecting to database");
        console.log(err);
        process.exit(1);
    }
}

// exporting
module.exports = dbConnect;
