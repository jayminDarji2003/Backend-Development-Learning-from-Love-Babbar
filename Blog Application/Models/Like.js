// importing mongoose
const mongoose = require("mongoose");

const LikeShema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"  // reference to the post model
    },
    user: {
        type: String,
        required: true
    }

}, { timestamps: true })

module.exports = mongoose.model("Like", LikeShema);