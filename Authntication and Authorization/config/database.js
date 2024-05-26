const mongoose = require('mongoose')

require('dotenv').config();

exports.connect = async () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Database connected successfully");
        })
        .catch((err) => {
            console.log("Error occured in database connection")
            console.error(err);
            process.exit(1);
        })
}