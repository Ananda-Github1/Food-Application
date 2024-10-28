const bcrypt = require('bcrypt');
const userModel = require("../models/userModel");

//  GET USER INFO
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById({ _id: req.body.id });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found"
            })
        } else {
            // Hide Password
            user.password = undefined;
            res.status(200).send({
                success: true,
                message: "User Get Successfully",
                user,
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error in Get User API',
            error
        })
    }
};

// UPDATE USER
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id });
        // Update User
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        // Save User
        await user.save();
        res.status(200).send({
            success: true,
            message: " User Upadate Successfully",
            user,
        })
        //Validation
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update API"
        })

    }
}

// Reset Password
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        //Validation of field check
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            });
        }
        // Validation of email and answer, check from database
        const user = await userModel.findOne({ email: email, answer: answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or Invalid answer"
            })
        }
        //Hashing New Password
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Password Reset API",
            error: error.message
        });
    }
};

// Update User Password
const updatePasswordController = async (req, res) => {
    try {
        //Find User
        const user = await userModel.findById({ _id: req.body.id });
        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        //Get data from user
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(404).send({
                success: false,
                message: "Please provide oldPassword or newPassword"
            });
        }
        //Compare the user password (Validation)
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: 'Invalid Old Password',
            })
        }
        //AFTER PASSWORD MATCH
        user.password = newPassword;

        //Hashing New Password
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Update Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Password API",
            error: error.message
        })

    }
}

// Delete User Account
const deleteUserController = async (req, res) => {
    try {
        // Validate if the ID is present in params
        const userId = req.params.id;
        if (!userId) {
            return res.status(400).send({
                success: false,
                message: "User ID is required"
            });
        }

        // Find the user by ID
        const user = await userModel.findById(userId);
        
        // Check if the user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        // Delete the user
        await userModel.findByIdAndDelete(userId);

        // Send success response
        return res.status(200).send({
            success: true,
            message: "Your account has been deleted 🥹"
        });

    } catch (error) {
        console.error("Error in Delete User API:", error);

        return res.status(500).send({
            success: false,
            message: "Internal server error while deleting the user",
            error: error.message
        });
    }
};


module.exports = {
    getUserController,
    updateUserController,
    resetPasswordController,
    updatePasswordController,
    deleteUserController
};





