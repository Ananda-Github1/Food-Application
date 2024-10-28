const resturantModel = require("../models/resturantModel");

// Create Resturant
const createResturantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body

        // Validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please provide title and address",
            });
        }
        // Creating
        const newResturant = new resturantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        })
        await newResturant.save()
        res.status(201).send({
            success: true,
            message: "New Resturant Created Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Create Resturant API",
            error: error.message
        });
    }
};

//Get All Resturant
const getAllResturant = async (req, res) => {
    try {
        const resturants = await resturantModel.find({});
        if (!resturants) {
            return res.status(404).send({
                success: false,
                message: " Resturant Not Available"
            });
        }
        res.status(200).send({
            success: true,
            totalCount: resturants.length,
            resturants,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Resturant API",
            error: error.message
        });
    }
};

//Get Resturant by ID
const getResturant = async (req, res) => {
    try {
        const resturantId = req.params.id
        //Validation of Restuant ID
        if(!resturantId){
            return res.status(404).send({
                success: false,
                message: "Resturant ID Not Found 🥹"
            });
        }
        //Find Resturant Validation
        const resturant = await resturantModel.findById(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "Resturant Not Found 🥹"
            });
        }
        res.status(200).send({
            success: true,
            resturant,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get Resturant API",
            error: error.message
        });
    }
};

//Delete Resturant Controller
const deleteResturantController = async (req, res) => {
    try {
        const resturantId = req.params.id
        //Validation of Restuant ID
        if(!resturantId){
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturant ID"
            });
        }
        //Find Resturant Validation
        const resturant = await resturantModel.findByIdAndDelete(resturantId)
        if (!resturant) {
            return res.status(404).send({
                success: false,
                message: "Resturant Not Found 🥹"
            });
        }
        res.status(200).send({
            success: true,
            message: "Resturant Delete Successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in Delete Resurant API"
        });
        
        
    }
};

module.exports = { createResturantController, getAllResturant, getResturant, deleteResturantController};