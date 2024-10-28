const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createFoodController,
    getAllFood,
    getFood,
    getFoodbyResturant, 
    updateFoodController,
    deleteFoodController,
    placeOrderController,
    orderStatusController} = require("../controllers/foodcontroller");
const adminMiddleware = require("../middlewares/adminMiddleware");
const router = express.Router();

//Create food router
router.post("/create", authMiddleware, createFoodController);

//Get All Food
router.get("/getfood", getAllFood);

//Get Food By ID Number
router.get('/foodbyid/:id', getFood);

//Get Food By Resturant
router.get('/foodresturant/:id', getFoodbyResturant);

//Update Food
router.put('/update/:id', authMiddleware, updateFoodController);

//Delete Food
router.put('/delete/:id', authMiddleware, deleteFoodController);

//Place Order
router.post('/placeorder', authMiddleware, placeOrderController);

//Order Status
router.post('/orderstatus/:id', authMiddleware , adminMiddleware, orderStatusController);

module.exports = router;