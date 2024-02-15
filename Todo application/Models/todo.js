const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        maxLength: 400
    }
}, { timestamps: true })

module.exports = mongoose.model("Todo", TodoSchema);