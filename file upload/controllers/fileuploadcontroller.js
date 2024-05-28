// importing models
const File = require("../models/file")

// localFileUpload -> handler fnx
// upload only in server
exports.localFileUpload = async (req, res) => {
    try {
        // fetch the file
        const file = req.files.file;
        console.log("FILE => ", file);

        let name = file.name;

        // here we are giving same name as file name
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

