// auth , isStudent, isAdmin
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract the jwt token
        const token = req.body.token;

        if (!token) {
            return res.stutus(401).json({
                success: false,
                message: "token missing"
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decode);
            req.user = decode;
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "something went wrong while verifying token"
        })
    }
}


exports.isStudent = (req,res,next) =>{
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message: "This is protected route for student"
            })
        }

        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message: "User role can't be verified"
        })
    }
}


exports.isAdmin = (req,res,next) =>{
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message: "This is protected route for admin"
            })
        }

        next();
    }catch(err){
        return res.status(500).json({
            success:false,
            message: "User role can't be verified"
        })
    }
}