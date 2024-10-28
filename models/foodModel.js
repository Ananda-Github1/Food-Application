const mongoose = require("mongoose");

// Schema
const foodSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true, "Food title is required"]
    },
    description:{
        type: String,
        required: [true, 'Food description is required']
    },
    price:{
        type: Number,
        required: [true, 'Food price is required']
    },
    imageUrl:{
        type: String,
        default: "https://s3-ap-southeast-1.amazonaws.com/motoristprod/editors%2Fimages%2F1715916281756-tesla-model-3-now-available-in-category-a-coe-spec-featured.jpg"
    },
    foodTag:{
        type: String,
    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    isAvailable:{
        type: Boolean,
        default: true
    },
    resturant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resturant'
    },
    rating:{
        type: Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type: String,
    }

}, {timestamps: true});

module.exports = mongoose.model("foods", foodSchema);