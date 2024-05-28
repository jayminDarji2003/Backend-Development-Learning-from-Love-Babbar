// importing
const express = require("express");
const router = express.Router();

// getting handlers from controllers
// const { imageUpload, videoUpload, imageReducerUpload, localFileUpload } = require("../controllers/fileuploadcontroller")
const { localFileUpload, imageUpload,videoUpload } = require("../controllers/fileuploadcontroller")

// api routes
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
// router.post("/imageReducerUpload", imageReducerUpload);
router.post("/localFileUpload", localFileUpload);

module.exports = router;