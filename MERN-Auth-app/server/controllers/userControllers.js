const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        console.log(name, email, password, role)

        return res.status(200).json({
            success: true,
            message: "SUCCESSFULLY REGISTERED"
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