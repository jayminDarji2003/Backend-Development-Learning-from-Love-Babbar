const mongoose = require("mongoose");

// create schema
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
}, {timestamps:true})

const File = mongoose.model("File", fileSchema);
module.exports = File;