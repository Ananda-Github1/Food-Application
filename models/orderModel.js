const mongoose = require("mongoose");

// Schema
const orderSchema = new mongoose.Schema({
    food: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foods'
    }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ["preparing", "prepare", "on the way", "delivered"],
        default: "preparing"
    }

}, { timestamps: true });

module.exports = mongoose.model("orders", orderSchema);