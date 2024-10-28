const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, 'category title is required']
    },
    imageUrl: {
        type: String,
        default: "https://s3-ap-southeast-1.amazonaws.com/motoristprod/editors%2Fimages%2F1715916281756-tesla-model-3-now-available-in-category-a-coe-spec-featured.jpg"
    }

}, { timestamps: true });

module.exports = mongoose.model("category", categorySchema);