// importing express
const express = require('express');

// create router instance
const router = express.Router();

// importing controller
const createTodo = require('../Controllers/createTodo');
const getTodos = require('../Controllers/getTodos');
const getSingleTodo = require('../Controllers/getSingleTodo');
const updateTodo = require('../Controllers/updateTodo');
const deleteTodo = require('../Controllers/deleteTodo');

// defining routes here
// post request (create todo)
router.post('/createTodo', createTodo)

// get request (fetch all todos)
router.get('/getTodos', getTodos);

// get single todo
router.get('/getTodos/:id', getSingleTodo);

// update todo
router.put('/updateTodo/:id', updateTodo);

// delete todo
router.delete('/deleteTodo/:id', deleteTodo);

// exporting
module.exports = router;