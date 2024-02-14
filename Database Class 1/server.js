// importing the express
const express = require('express');

// create the instance of express
const app = express();

// create the port
const PORT = 3000;

// listening the server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})

// body parser to get the data from body
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // parsing the json data and add it to request body object

// creating our first route "/"
// get request
app.get('/', (req, res) => {
    res.send("<h1>Welcome to my first route!</h1>");
});

// creating post request
app.post('/api/cars', (req, res) => {
    const { name, brand } = req.body;
    console.log(name)
    console.log(brand)
    res.send("car submitted successfully")
})


// mongodb port 
const mongoDB = 'mongodb://127.0.0.1:27017/dot_batch'

// Mongodb connection
const mongoose = require('mongoose');
mongoose.connect(mongoDB)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));