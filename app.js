const express = require('express')
const expressLayouts = require('express-ejs-layouts')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000



const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const session = require('express-session')

app.use(fileUpload())
app.use(cookieParser('CookingBlogSecure'))
app.use(flash())
app.use(session({
    secret: 'CookingBlogSecureSession',
    saveUninitialized: true,
    resave: true
}))




// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(expressLayouts)

// template engine
app.set('layout', './layouts/main')
app.set('view engine', 'ejs')

// route
const mainRouter = require('./server/route/recipeRouter')
app.use('/', mainRouter)

// Database connected
const connectDb = require('./server/models/database')
const start = async()=>{ 
    try {
        await connectDb(process.env.MONGO_URL)
        app.listen(port, (req, res) => {console.log(`Listening on port: ${port}`)})
    } catch (error) {
        console.log(error);
    }
}
start()