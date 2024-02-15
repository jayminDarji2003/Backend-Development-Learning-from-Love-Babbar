// importing express
const express = require('express');

// create router instance
const router = express.Router();

// importing controller
const createTodo = require('../Controllers/createTodo');

// defining routes here
// post request
router.post('/createTodo', createTodo)



// exporting
module.exports = router;