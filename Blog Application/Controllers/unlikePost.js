// const Post = require("../Models/Post");
// const Like = require("../Models/Like");

// const unlikePost = async (req, res) => {
//     try {
//         const { post, like } = req.body;

//         // find and delete the like from like collection
//         const deletedLike = await Like.findOneAndDelete({ post: post, _id: like })

//         // update the post collection
//         const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true })

//         // response 
//         res.json({
//             updatedPost
//         })
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(500).json({
//             error: "error while unliking post"
//         })
//     }
// }

// module.exports = unlikePost;


const Post = require("../Models/Post");
const Like = require("../Models/Like");

const unlikePost = async (req, res) => {
    try {
        const { post, likes } = req.body;

        // find and delete the like from like collection
        const deletedLike = await Like.findOneAndDelete({ post: post, _id: like });

        // Check if like was found and deleted
        if (!deletedLike) {
            return res.status(404).json({ error: "Like not found" });
        }

        // update the post collection
        const updatedPost = await Post.findByIdAndUpdate(post, { $pull: { likes: deletedLike._id } }, { new: true });

        // response 
        res.json({
            updatedPost
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            error: "Error while unliking post"
        });
    }
};

module.exports = unlikePost;
