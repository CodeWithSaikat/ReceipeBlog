const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    userName:{
        type: String,
        trim: true,
        required:[true, "Name is required "]
    },
    recipeName: {
        type: String,
        trim: true,
        required: [true, "Recipe Name is required "]
    },
    email: {
        type: String,
        required: [true, "Email is required "]
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    ingredients: {
        type: Array,
        required: [true, "Ingredients is required"]
    },
    category: {
        type: String,
        enum: ['Indian', "American", 'Thai', 'Punjabi'],
        required: [true, "Category is required"]
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    date: {
        type: Date,
        default: Date.now()    
    },
})

// search
recipeSchema.index({ recipeName: 'text', description: 'text' })

module.exports = mongoose.model('RecipeList', recipeSchema)