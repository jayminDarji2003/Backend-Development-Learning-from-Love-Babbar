// imort Todo model
const Todo = require("../Models/todo");

const deleteTodo = async (req, res) => {
    try {
        // fetch the id first
        const { id } = req.params;

        // delete the todo
        const response = await Todo.findByIdAndDelete({ _id: id })

        // if not deleted
        if (!response) {
            return res.status(404)
                .json({
                    success: false,
                    message: "not deleted"
                })
        }

        // response 
        res.status(200)
            .json({
                success: true,
                data: response,
                message: "successfully deleted the todo"
            })
    }
    catch (err) {
        console.log(err);

        // response
        res.status(500)
            .json({
                success: false,
                message: "delete todo failed"
            })
    }
}

module.exports = deleteTodo;
