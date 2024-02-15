// importing mongoose
const mongoose = require("mongoose");

const LikeShema = new mongoose.Schema({

}, { timestamps: true })

module.exports = mongoose.model("Like", LikeShema);