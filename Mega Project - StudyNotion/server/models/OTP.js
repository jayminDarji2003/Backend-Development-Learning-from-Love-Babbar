const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60  // 5 minutes
    }
});


// send OTP to email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", otp)
        console.log("MAIL SEND SUCCESSFULLY");
        console.log(mailResponse);
    } catch (error) {
        console.error(error);
        console.log("ERROR OCCURED WHILE SENDING VERIFICATION EMAIL")
    }
}


OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})



module.exports = mongoose.model("OTP", OTPSchema);
