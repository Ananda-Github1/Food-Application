const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getCatController, updateCatController, deleteCatController } = require("../controllers/categorycontroller");
const router = express.Router();

//Create Category
router.post('/create', authMiddleware, createCatController)

//Get All Catagory
router.get('/getall', getCatController);

//Update Catagory
router.put("/update/:id", authMiddleware, updateCatController);

//Delete Catagory
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router