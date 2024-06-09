const bcrypt = require('bcrypt');
const User = require("../models/user");

const registerr = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // check if user alredy exists or not
        const existingUser = await User.findOne({ email });
        // console.log(user)
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
            message: "SUCCESSFULLY REGISTERED",
            user
        })
    } catch (error) {
        console.log("ERROR WHILE REGISTERING")
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "ERROR WHILE REGISTERING"
        })
    }
}


const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Log the incoming request body
        console.log('Request body:', req.body);

        // Check if all required fields are provided
        if (!name || !email || !password || !role) {
            console.log('all fields are required')
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("user already exits in database")
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Secure password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create entry in database
        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(201).json({
            success: true,
            message: "Successfully registered",
            user
        });
    } catch (error) {
        console.error("Error while registering:", error);
        return res.status(500).json({
            success: false,
            message: "Error while registering"
        });
    }
};
const login = async (req, res) => {
    try {

    } catch (error) {
        console.log("ERROR WHILE LOGIN")
        console.log(error);
        res.status(400).json({
            success: false,
            message: "ERROR WHILE LOGIN"
        })
    }
}

module.exports = { register, login }