const categoryModel = require("../models/categoryModel");

// Create Catagory Controller
const createCatController = async (req, res) => {
    try {
        const { title, imageUrl } = req.body
        // Validation
        if (!title) {
            return res.status(404).send({
                success: false,
                message: "Please provide category title and image"
            })
        }
        // Create of new category
        const newCatagory = new categoryModel({ title, imageUrl })
        await newCatagory.save();

        //Success message
        res.status(200).send({
            success: true,
            message: "New category created successfully",
            newCatagory,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Category Resurant API",
            error: error.message
        });
    }
};

// Get All Catagory
const getCatController = async (req, res) => {
    try {
        const catagories = await categoryModel.find({});
        if (!catagories) {
            return res.status(404).send({
                success: false,
                message: " Category Not Available"
            });
        }
        res.status(200).send({
            success: true,
            totalCategories: catagories.length,
            catagories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get All Category Resurant API",
            error: error.message
        });
    }
};

// Update Category
const updateCatController = async (req, res) => {
    try {
        const { id } = req.params
        const { title, imageUrl } = req.body
        const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true })
        if (!updateCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category Found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category update successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Update Category API",
            error: error.message
        });
    }
};
// Delete Category 
const deleteCatController = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Category ID"
            })
        }
        const category = await categoryModel.findById(id)
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "No Category Found"
            });
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Delete Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Delete Category API",
            error: error.message
        });
    }
};
module.exports = { createCatController, getCatController, updateCatController, deleteCatController }
