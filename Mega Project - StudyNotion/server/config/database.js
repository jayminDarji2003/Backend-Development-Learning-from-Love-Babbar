// importing
const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log("DATABASE CONNECTED SUCCESSFULLY")
    } catch (error) {
        console.log("ERROR OCCURED WHILE CONNECTING TO MONGODB DATABASE")
        console.error(error)
        process.exit(1);
    }
}

module.exports = dbConnect;