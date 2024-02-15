// importing express
const express = require('express');

// creating router
const router = express.Router();

// importing controllers
const createComment = require('../Controllers/createComment');
const createPost = require('../Controllers/createPost');
const getAllPost = require('../Controllers/getAllPost');
const likePost = require('../Controllers/likePost');
const unlikePost = require('../Controllers/unlikePost');

// mapping routes
router.post("/comments/create", createComment);
router.post("/posts/create", createPost)
router.get("/posts", getAllPost)
router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

// export
module.exports = router;