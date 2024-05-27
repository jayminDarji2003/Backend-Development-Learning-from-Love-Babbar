// to convert the password in Hash we use bcrypt
const bcrypt = require('bcrypt');

const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { response } = require('express');
require("dotenv").config();

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
    try {
        // data fetch
        const { email, password } = req.body;

        // validation on email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please enter details carefully."
            });
        }

        // check user avalilable or not
        const user = await User.findOne({ email });

        // if not a registered user
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Please register before login."
            });
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        // verify password and generate jwt token
        if (await bcrypt.compare(password, user.password)) {
            // password matched

            // create jwt token
            let token = jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {
                    expiresIn: "2h"
                });

            user.token = token;  // add token to user
            user.password = undefined;

            // create cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully"
            })


        } else {
            // password not matched
            return res.status(403).json({
                success: false,
                message: "Password incorrect."
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success:false,
            message: "Couldn't login"
        })
    }