const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

// create schema
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
}, { timestamps: true })

// this is very important things to know that create POST middleware before creating model.
// here we are making a functionality that after each entry to the database send mail to email.
// here we will use POST middleware to send mail and also we need "nodemailer" package to send mail
// post
fileSchema.post("save", async function (doc) {
    // here "doc" means entry which is creating in database, that data is "doc"
    try {
        console.log("DOC => ", doc);

        // creating transporter
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        // send mail
        const info = await transporter.sendMail({
            from: "codewithjaymin", // sender address
            to: doc.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "New file uploaded to Cloudinary", // plain text body
            html: `<h1>Hii, This is from codewithjaymin</h1>
                   <p>File uploaded successfully to Cloudinary</p>
                   <a href="${doc?.fileUrl}">check out</a>`, // html body
        });

        console.log("INFO => ", info)


    } catch (error) {
        console.error(error);
    }
});


const File = mongoose.model("File", fileSchema);
module.exports = File;