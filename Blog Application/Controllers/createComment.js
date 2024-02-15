// importing
const Post = require("../Models/Post")
const Comment = require("../Models/Comment")

// logic
const createComment = async (req, res) => {
    try {
        // extract the datas
        const { post, user, body } = req.body;

        // create object
        const comment = new Comment({
            post, user, body
        })

        // save the data to comment database
        const savedData = await comment.save()

        //find the post by Id and add the new comment to its comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {
            $push: {
                comments: savedData._id
            }
        },
            {
                new: true,  // this means after updating the document return me the new document
            })
            .populate("comments")  // populate the comments array with comment documents
            .exec()


        // response
        res.json({
            post: updatedPost,
        })
    }
    catch (err) {
        console.log(err);
        return res.satus(500).json({
            success: false,
            message: "Error while creating comment"
        })
    }
}

// exporting
module.exports = createComment;


