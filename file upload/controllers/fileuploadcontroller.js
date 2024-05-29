// importing models
const File = require("../models/file")
const cloudinary = require("cloudinary").v2

// localFileUpload -> handler fnx
// upload only in server
exports.localFileUpload = async (req, res) => {
    try {
        // fetch the file
        const file = req.files.file;
        console.log("FILE => ", file);

        let name = file.name;

        // here we are giving same name as file name to the path
        // let path = __dirname + "/files/" + name;

        // here we are giving different name and extension 
        let path = __dirname + "/files/" + Math.random() + `.${name.split('.')[1]}`;
        // here name ==> jaymin.jpg  ==> split based on "." so there will be two indexe. 0 => jaymin    , and   1 => jpg 
        // so we take the extension
        console.log("PATH => ", path);

        file.mv(path, (err) => {
            console.log(err);
        })

        res.json({
            success: true,
            message: "local file uploaded successfully"
        })
    } catch (err) {
        console.log(err);
    }
}

// check file exists or not
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}



// video upload helper functions
async function videoUploadFileToCloudinary(file, folder) {
    const options = { folder, resource_type: 'video' };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log("ERROR IN FILE UPLOAD TO Cloudinary");
        console.error(error);
        throw error;
    }
}

// image upload helper functions
async function imageUploadFileToCloudinary(file, folder) {
    const options = { folder };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log("ERROR IN FILE UPLOAD TO Cloudinary");
        console.error(error);
        throw error;
    }
}
// image reduce upload helper functions
async function reduceImageUploadFileToCloudinary(file, folder, quality) {
    const options = { folder, quality };
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log(result);
        return result;
    } catch (error) {
        console.log("ERROR IN FILE UPLOAD TO Cloudinary");
        console.error(error);
        throw error;
    }
}


// image upload
exports.imageUpload = async (req, res) => {
    try {
        // fetch the data from req
        const { name, email, tags } = req.body;
        console.log("GET THE DATA : ", name, email, tags);

        // get file
        const file = req.files.imageFile;
        console.log("GET FILE : ", file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        // current file type
        const currentFileType = file.name.split(".")[1].toLowerCase();
        console.log("FILE EXTENSION : ", currentFileType);

        // file type not supported
        if (!isFileTypeSupported(currentFileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // file type is supported
        console.log("UPLOADING TO CLOUDINARY")
        const response = await imageUploadFileToCloudinary(file, "dotbatch");
        // file = file name
        // dotbatch = folder name , it is in the cloudinary folder
        console.log("RESPONSE => ", response);

        // database entry
        console.log("DATABASE ENTRY CREATING");
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })
        console.log("DATABASE ENTRY DONE");

        res.json({
            success: true,
            message: "File created successfully created successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: "something went wrong while uploading image"
        })
    }
}


// video upload handler
exports.videoUpload = async (req, res) => {
    try {
        // fetch the data
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // video file data
        const videoFile = req.files.video;
        console.log(videoFile)

        // validation
        const supportedTypes = ["mp4", "mp3", "mkv"];

        // current file type
        const currentFileType = videoFile.name.split(".")[1].toLowerCase();
        console.log("FILE EXTENSION : ", currentFileType);

        // file type not supported
        if (!isFileTypeSupported(currentFileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // file type is supported
        console.log("UPLOADING TO CLOUDINARY")
        const response = await videoUploadFileToCloudinary(videoFile, "dotbatch");
        // file = file name
        // dotbatch = folder name , it is in the cloudinary folder
        console.log("RESPONSE => ", response);

        // database entry
        console.log("DATABASE ENTRY CREATING");
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.url
        })
        console.log("DATABASE ENTRY DONE");

        res.json({
            success: true,
            message: "video created successfully created successfully"
        })
    } catch (e) {
        console.error("Something went wrong");
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading video"
        })
    }
}


// reduce image then upload 
exports.imageReducerUpload = async (req, res) => {
    try {
        // fetch the data from req
        const { name, email, tags } = req.body;
        console.log("GET THE DATA : ", name, email, tags);

        // get file
        const file = req.files.imageFile;
        console.log("GET FILE : ", file);

        // validation
        const supportedTypes = ["jpg", "jpeg", "png"];

        // current file type
        const currentFileType = file.name.split(".")[1].toLowerCase();
        console.log("FILE EXTENSION : ", currentFileType);

        // file type not supported
        // upper limit file size
        if (!isFileTypeSupported(currentFileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            })
        }

        // file type is supported
        console.log("UPLOADING TO CLOUDINARY")
        const response = await reduceImageUploadFileToCloudinary(file, "dotbatch", 30);  // 30 is the quality value
        // file = file name
        // dotbatch = folder name , it is in the cloudinary folder
        console.log("RESPONSE => ", response);

        // database entry
        console.log("DATABASE ENTRY CREATING");
        const fileData = await File.create({
            name,
            tags,
            email,
            fileUrl: response.secure_url
        })
        console.log("DATABASE ENTRY DONE");

        res.json({
            success: true,
            image_url: response.secure_url,
            message: "File created successfully created successfully"
        })

    } catch (e) {
        console.error("Something went wrong");
        res.status(400).json({
            success: false,
            message: "Something went wrong while uploading image"
        })
    }
}