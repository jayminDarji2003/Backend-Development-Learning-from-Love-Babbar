// importing mongoose
const mongoose = require('mongoose')

// importing .env data
require('dotenv').config()

// connect to mongodb function
const connectDb = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB atlas");
    }
    catch (err) {
        console.log("Error while connecting to MongoDB");
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDb;