// importing some datas
const express = require('express')
const connectDb = require("./Config/database")

// create instance of express
const app = express()

// port
require('dotenv').config()
const PORT = process.env.PORT || 5000;

// middleware for sending and fetching json data
app.use(express.json());

// importing routes
const blog = require('./Routes/blogs')
// mapping path
app.use("/api/v1", blog);


// listening the app
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})

// connect to database
connectDb()

//  default route
app.get('/', (req, res) => {
    res.send("<h1>welcome to my application!!</h1>")
})