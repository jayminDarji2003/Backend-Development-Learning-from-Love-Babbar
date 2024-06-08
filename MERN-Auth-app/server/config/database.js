const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        if (!connect) {
            console.log("Couldn't connect to Mongodb")
        }
        console.log("CONNECTED TO MONGODB")
    } catch (error) {
        console.log("ERROR OCCURED WHILE CONNECTING TO DATABASE")
        console.log(error)
    }
}

module.exports = dbConnect