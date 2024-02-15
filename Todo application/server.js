// importing datas
const express = require('express');

// create instance of express
const app = express();

// importing dotenv and use .env data
require('dotenv').config();

// port
const PORT = process.env.PORT || 4000;

// middleware to parse json request body
app.use(express.json());

// importing routes
const todoRoutes = require("./Routes/todos")
//mount the todo routes
app.use("/api/v1", todoRoutes);


app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})

// connecting to database
const dbConnect = require('./Config/database');
dbConnect()

// default route 
app.get('/',(req, res) => {
    res.send('<h1>welcome to my page.</h1>')
})