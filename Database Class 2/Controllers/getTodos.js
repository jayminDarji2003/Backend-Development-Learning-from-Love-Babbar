// importing Todo model
const Todo = require("../Models/todo");

const getTodos = async (req, res) => {
    try {
        // fetch all todos from database
        const todos = await Todo.find({});

        // response
        res.status(200)
            .json({
                success: true,
                data: todos,
                message: "Successfully retrieved all todos from database"
            })
    }
    catch (error) {
        console.error(error);
        // response 
        res.status(500)
            .json({
                success: false,
                data: error,
                message: "Error while fetching todos from database"
            })
    }
}

module.exports = getTodos;