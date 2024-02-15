// import Todo model
const Todo = require("../Models/todo");

const getSingleTodo = async (req, res) => {
    try {
        // fetch the id
        const id = req.params.id;

        // fetch the todo
        // if _id == id then fetch that todo
        const todo = await Todo.findById({ _id: id });

        // if todo is not found
        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }
        
        // successfully todo found
        // response
        res.status(200)
            .json({
                success: true,
                data: todo,
                message: "successfully get the todo"
            })
    }
    catch (err) {
        console.log(err);

        // response
        res.status(500)
            .json({
                success: false,
                data: err,
                message: "Error while fetching the todo"
            })
    }
}

module.exports = getSingleTodo;