// importing model post
const Post = require("../Models/Post");

// logic
const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const post = new Post({
            title, body
        });
        const savedPost = await post.save();

        res.status(200).json({
            post: savedPost,
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error:"error while creating post"
        })
    }
}

// exporting
module.exports = createPost;