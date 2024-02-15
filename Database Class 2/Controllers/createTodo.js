// importing Todo model
const Todo = require("../Models/todo");

// creating handler
const createTodo = async (req, res) => {
    try {
        // extract title and description from request body
        const { title, description } = req.body;

        // now we have the data (title, description) 
        // now we create a new Todo object and insert it to the database
        const response = await Todo.create({ title, description })

        // success response
        res.status(200).json({
            success: true,
            data: response,
            message: "Todo created successfully"
        })
    }
    catch (error) {
        console.error("Error creating Todo");
        console.log(error.message);
        res.status(500).json({
            success: false,
            data: "internal server error",
            message: error.message
        })
    }
}

// exporting handler
module.exports = createTodo;