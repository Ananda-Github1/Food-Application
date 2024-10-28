const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createResturantController, getAllResturant, getResturant, deleteResturantController } = require("../controllers/restrantcontroller");
const router = express.Router();

// Create Resturant Route || Post Method
router.post("/create", authMiddleware, createResturantController);

// Get All Resturants || Get Method
router.get("/getall", getAllResturant);

// Get Resturant || Get Method
router.get("/get/:id", getResturant);

//Delete Resturant || Delete Method
router.delete("/getdelete/:id", authMiddleware, deleteResturantController);

module.exports = router