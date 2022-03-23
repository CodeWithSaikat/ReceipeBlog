const mongoose = require('mongoose')

const connectDB = (url) =>{
    mongoose.connect(url)
    console.log('Database is on...')
}

require('./categorySchema')
require('./recipeSchema')
module.exports = connectDB