const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required "]
    },

    image: {
        type: String,
        require: [true, "image is required "]
    },
    date: {
        type: Date,
        default: Date.now    },
})


module.exports = mongoose.model('categorySchema', categorySchema)