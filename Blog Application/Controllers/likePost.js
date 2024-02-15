const Post = require("../Models/Post");
const Like = require("../Models/Like");

// like a post
const likePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const like = new Like({ post, user });
        const savedLike = await like.save();

        // update the post collection
        const updatedPot = await Post.findByIdAndUpdate(post, { $push: { likes: savedLike } }, { new: true }).populate("likes").exec();

        // response
        res.json({
            post: updatedPot
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "error while creating like"
        })
    }
}

module.exports = likePost;