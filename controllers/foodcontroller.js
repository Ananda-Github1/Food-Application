const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

// Create Food Item
const createFoodController = async (req, res) => {
    try {
        const { title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            resturant,
            rating,
            ratingCount } = req.body;
        
        if(!title || !description || !price || !resturant){
            return res.status(500).send({
                success: false,
                message: "Please provide the required fields"
            })
        }
        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        });
        await newFood.save();
        res.status(201).send({
            success: true,
            message: "New Food Item Created",
            newFood,
        });

    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error in food create API"
        });  
    }
};

//Get All Food
const getAllFood = async (req, res) => {
    try {
        const food = await foodModel.find({});
        // Validation
        if(!food){
            res.status(404).send({
                success: false,
                message: "No food available"
            })
        }
        res.status(201).send({
            success: true,
            totlFood: food.length,
            food,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in Get All Food API",
            error: error.message
        });
        
        
    }
};

//Get Food by ID
const getFood = async (req, res) => {
    try {
        const foodId = req.params.id
        const food = await foodModel.findById(foodId)
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "No food found"
            })
        }
        if(!food){
            return res.status(404).send({
                success: false,
                message: "No food found"
            });
        }
        res.status(200).send({
            success: true,
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in Get Food ID API",
            error: error.message
        });
    }
};

//Get Food by Resturant
const getFoodbyResturant = async (req, res) => {
    try {
        const resturantId = req.params.id
        if(!resturantId){
            return res.status(404).send({
                success: false,
                message: "Please Provide Resturant ID"
            });
        }
        const food = await foodModel.find({resturant: resturantId});
        if(!food){
            return res.status(404).send({
                success: false,
                message: "No food found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Food based on Resturant",
            food,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in Get Food By Resturant API",
            error: error.message
        });
    }
};

//Update Food Controller
const updateFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "No food id was found"
            });
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success: false,
                message: "No food found"
            })
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        } = req.body;
        const updatedFood = await foodModel.findByIdAndUpdate(foodId, {
            title,
            description,
            price,
            imageUrl,
            foodTag,
            category,
            code,
            isAvailable,
            resturant,
            rating,
        }, {new: true});
        res.status(200).send({
            success: true,
            message: "Food item upadted",
            food,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in update food API",
            error: error.message
        });
    }
};

//Delete Food
const deleteFoodController = async (req, res) => {
    try {
        const foodId = req.params.id
        if(!foodId){
            return res.status(404).send({
                success: false,
                message: "Provide foof id"
            });
        }
        const food = await foodModel.findById(foodId)
        if(!food){
            return res.status(404).send({
                success: false,
                message: "No food found in this id"
            });
        }
        await foodModel.findByIdAndDelete(foodId)
        res.status(201).send({
            success:true,
            message: "Food item deleted"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in delete food API",
            error: error.message
        });
    }
};

//Place order
const placeOrderController = async (req, res) => {
    try {
        const { cart } = req.body
        if(!cart){
            return res.status(404).send({
                success: false,
                message:"Please add food in card and select payment methd"
            });
        }
        //calculate
        let total = 0
        cart.map((i) => {
            total += i.price
        })
        const newOrder = new orderModel({
                foods:cart,
                payment: total,
                buyer: req.body.id
            });
        await newOrder.save();
        res.status(201).send({
            success: true,
            message: "Order place successfully",
            newOrder,
        });
    } catch (error) {
        console.log(error);
        res.status(404).send({
            success: false,
            message: 'Error in Place Order API',
            error: error.message
        });  
    }
};

//Change Order Status
const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id
        if(!orderId){
            return res.status(404).send({
                success: false,
                message: "Provide valid order id"
            });
        }
        const {status} = req.body
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});
        res.status(201).send({
            success: true,
            message: "Order Status Updated"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Change Order API"
        });  
    }
};


module.exports = {
    createFoodController,
    getAllFood,
    getFood,
    getFoodbyResturant,
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController
};

