// to convert the password in Hash we use bcrypt
const bcrypt = require('bcrypt');

const User = require("../models/user");

// signup route handler
exports.signup = async (req, res) => {
    try {
        // get the data
        const { name, email, password, role } = req.body;

        // check if user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {  // if user already exists
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        //secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error hashing password"
            })
        }

        // create entry to database
        const user = await User.create({
            name, email, password: hashedPassword, role

        })

        return res.status(200).json({
            success: true,
            message: "User created successfully"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered! please try again later"
        })
    }
}


// login route handler
exports.login = async (req, res) => {
    confirm.log("login")
}