const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const JWT = require("jsonwebtoken");

//REGISTER
const registerController = async (req, res) => {
    try {
        const { userName, email, password, phone, address, answer } = req.body;
        //validation
        if (!userName || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false,
                message: 'Please provide all field',
            })
        }
        //checking for existing user
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                success: false,
                message: 'Email already registered please Login',
            })
        }

        //Encrypting Password by bcrypt
        let salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create New User 
        const user = await userModel.create({
            userName,
            email,
            password: hashedPassword,
            address,
            phone,
            answer,
        });
        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in register API',
            error
        })
    }
};

//LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        //Validation
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'fill email and password'
            })
        }
        //Check user
        const user = await userModel.findOne({email: email});
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email or Password is wrong'
            })
        }
        //compare the user password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message: 'Invalid Credentials',
            })
        }

        //JWT token
        const token = JWT.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        user.password = undefined;

        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        })
    }
};

module.exports = { registerController, loginController, }