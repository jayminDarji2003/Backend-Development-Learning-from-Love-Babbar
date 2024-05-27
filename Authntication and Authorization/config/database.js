const mongoose = require('mongoose')

require('dotenv').config();

exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.log("Error occurred in database connection");
        console.error(err);
        process.exit(1);
    }
}