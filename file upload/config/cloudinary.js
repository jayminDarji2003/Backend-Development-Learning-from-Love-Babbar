// cloudinary integration

// in .config() we need to pass three arguments
// 1. cloud name
// 2. api key
// 3. api secret

// importing cloudinary
const cloudinary = require("cloudinary").v2;
require("dotenv").config()

exports.cloudinaryConnect = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    } catch (e) {
        console.log("Error occured while connecting to cloudinary");
        console.log(e);
    }
}

// module.exports = cloudinaryConnect;