// import express package
const express = require('express');

// create instance
const app = express();

// load all the data of .env file
require('dotenv').config();

// port 
const PORT = process.env.PORT || 3000;

app.use(express.json());

require('./config/database').connect();

// route import and mount
const user = require('./routes/user')

app.use('/api/v1', user)

// server activation
app.listen(PORT, (req, res) => {
    console.log("server listening on port : ", PORT);
}) 