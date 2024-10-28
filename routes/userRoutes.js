const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteUserController } = require("../controllers/usercontroller");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// User Register 
router.get('/getuser', authMiddleware, getUserController);

// Update Profile
router.put('/updateuser', authMiddleware, updateUserController );

// Reset Password
router.post('/resetpassword', authMiddleware, resetPasswordController);

// Update password
router.post("/updatepassword", authMiddleware, updatePasswordController);

// Delete User Account
router.delete("/deleteuser/:id", authMiddleware, deleteUserController);


module.exports = router;
