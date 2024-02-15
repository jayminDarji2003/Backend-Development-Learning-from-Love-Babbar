const Post = require("../Models/Post")

const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().populate("likes").populate("comments").exec();
        res.status(200).json({
            success: true,
            data: posts,
            message: "we got all posts!"
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "error while fetching post"
        })
    }
}

module.exports = getAllPost;