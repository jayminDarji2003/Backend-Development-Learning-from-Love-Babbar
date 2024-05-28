const mongoose = require("mongoose");  // importing mongoose
require("dotenv").config()  // importing .env file data

exports.dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to database successfully");
    } catch (err) {
        console.log(err);
        console.log("Error occurred while connecting to MongoDB");
        process.exit(1);
    }
}

// module.exports = dbConnect();
