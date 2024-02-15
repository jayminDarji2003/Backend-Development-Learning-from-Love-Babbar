// importing mongoose
const mongoose = require('mongoose')

const CommentShema = new mongoose.Schema({

}, { timestamps: true })

module.exports = mongoose.model("Comment", CommentShema)