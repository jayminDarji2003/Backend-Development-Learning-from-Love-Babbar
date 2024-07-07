// app create
const express = require('express');
const app = express();

// port find out
require("dotenv").config()
const PORT = process.env.PORT || 3000;

// add middleware
app.use(express.json());
const fileupload = require("express-fileupload")

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// db connect
const db = require("./config/database")
db.dbConnect()

// cloudinary connect
const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect()

//api routes
const upload = require("./routes/fileupload");
// mount
app.use('/api/v1/upload', upload);


// activate app
app.listen(PORT, (req, res) => {
    console.log(`App listening on port ${PORT}`);
})
