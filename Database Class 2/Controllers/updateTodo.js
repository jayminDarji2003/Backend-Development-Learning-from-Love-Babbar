// importing todo model
const Todo = require("../Models/todo");

const updateTodo = async (req, res) => {
    try {
        // fetch the id first
        const id = req.params.id;

        // fetch title and description
        const { title, description } = req.body;

        // update the todo
        const response = await Todo.findByIdAndUpdate(
            { _id: id },
            { title: title, description: description }
        )

        // response
        res.status(200)
            .json({
                success: true,
                data: response,
                message: "update successfully"
            })
    }
    catch (err) {
        console.log(err);

        // response
        res.status(500)
            .json({
                success: false,
                message: "update failed"
            })
    }
}

module.exports = updateTodo;
