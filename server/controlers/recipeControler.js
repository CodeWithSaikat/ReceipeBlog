require('../models/database')
const Category = require('../models/categorySchema')
const Recipe = require('../models/recipeSchema')


//  GET / 
// Homepage

exports.homepage = async (req, res) => {
    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber)

        const thai = await Recipe.find({ 'category': 'Thai' }).sort({ _id: -1 }).limit(limitNumber)
        const indian = await Recipe.find({ 'category': 'Indian' }).sort({ _id: -1 }).limit(limitNumber)
        const american = await Recipe.find({ 'category': 'American' }).sort({ _id: -1 }).limit(limitNumber)
        const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        const latestFood = { recipes, indian, thai, american };

        res.render('index', { title: 'Cooking Blog- Homepage', categories, latestFood })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}


//  GET / 
// Categories details

exports.viewCategories = async (req, res) => {
    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber)
        res.render('viewCategories', { title: 'Cooking Blog- View Categories', categories })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}






//  GET / :id
// Categories details by id

exports.viewCategoriesById = async (req, res) => {
    try {
        let limitNumber = 20
        let categoryId = req.params.id
        const categoryById = await Recipe.find({ 'category': categoryId }).limit(limitNumber)
        res.render('viewRecipes', { title: 'Cooking Blog- View Categories', categoryById })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}






//  GET /
// Recipes details

exports.viewRecipes = async (req, res) => {
    try {
        const limitNumber = 20;
        const thai = await Recipe.find({ 'category': 'Thai' }).sort({ _id: -1 }).limit(limitNumber)
        const indian = await Recipe.find({ 'category': 'Indian' }).sort({ _id: -1 }).limit(limitNumber)
        const american = await Recipe.find({ 'category': 'American' }).sort({ _id: -1 }).limit(limitNumber)

        const recipes = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        const latestFood = { recipes, indian, thai, american };
        res.render('viewRecipes', { title: 'Cooking Blog- View Latest Recipes', latestFood })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}





//  GET /recepi/:id 
// Details view Recipes 

exports.detailsViewRecipes = async (req, res) => {
    try {

        let recipeId = req.params.id
        let recipe = await Recipe.findById(recipeId)
        res.render('detailsViewRecipes', { title: 'Cooking Blog- View Latest Recipes', recipe })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}






//  POST /SEARCH
// SEARCH

exports.searchRecipe = async (req, res) => {
    // search
    try {
        let searchTerm = req.body.searchTerm;
        let recipeSearch = await Recipe.find({ $text: { $search: searchTerm, $diacriticSensitive: true } })
        res.render('search', { title: 'Cooking Blog - Search', recipeSearch })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}

//  GET / exploreLetest
// exploreLetest

exports.exploreLetest = async (req, res) => {
    // search
    try {
        let limitNumber = 50;
        let exploreLetest = await Recipe.find({}).sort({ _id: -1 }).limit(limitNumber)
        res.render('explore-letest', { title: 'Cooking Blog - Explore Letest', exploreLetest })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}



//  GET / explore random
// exploreRandom

exports.exploreRandom = async (req, res) => {
    // search
    try {
        let count = await Recipe.find().countDocuments()
        let random = Math.floor(Math.random() * count)
        let exploreRandom = await Recipe.findOne().skip(random).exec()
        res.render('explore-random', { title: 'Cooking Blog - Explore Letest', exploreRandom })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error Occured ' })
    }
}





//  GET / explore random
// submitRecipe

exports.submitRecipe = async (req, res) => {
    const infoErrorObj = req.flash('infoError')
    const infoSucessObj = req.flash('infoSucess')

    res.render('submit-recipe', { title: 'Cooking Blog - Submit the Recipe', infoErrorObj, infoSucessObj })
}


//  POST / SUBMIT RECIPE ON POST
// submitRecipeOnPost

exports.submitRecipeOnPost = async (req, res) => {

    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName;


        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files were Uploaded');
        } else {
            imageUploadFile = req.files.image;
            newImageName = Date.now() + imageUploadFile.name;

            uploadPath = require('path').resolve('./')+'/public/uploads/' + newImageName;

            imageUploadFile.mv(uploadPath, ((err)=>{
                if (err) return res.status(500).send(err)
            }))

        }

            const newRecipe = Recipe({
            userName: req.body.userName,
            recipeName: req.body.recipeName,
            email: req.body.email,
            description: req.body.description,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        })  

        await newRecipe.save()

        req.flash('infoSucess', 'Recipe sucessfully added.')
        res.redirect('/submit-recipe')
    } catch (error) {
        // res.json(error)
        req.flash('infoError', error)
        res.redirect('/submit-recipe')
    }





    // console.log('Post by submit recipe on post button');
}










































// Dymmy Data
// async function insertDymmyCategoryData() {
//     try {
//         await Category.insertMany([
//             {
//                 "name": 'Indian',
//                 "image": "/img/indian-food.jpg"
//             },
//             {
//                 "name": 'American',
//                 "image": "../img/indian-food.jpg"
//             },
//             {
//                 "name": 'chinese ',
//                 "image": "chinese-food.jpg"
//             },
//             {
//                 "name": 'Spanish',
//                 "image": "spanish-food.jpg"
//             },
//             {
//                 "name": 'Mexican',
//                 "image": "mexican-food.jpg"
//             },
//         ])
//     } catch (error) {
//         console.log('err: ' + error);
//     }
// }
// insertDymmyCategoryData()



// async function insertDymmyRecipe() {
//     try {
//         await Recipe.insertMany([
//             {
//                 'recipeName': "Chiken Koram",
//                 'email': "bachandas@gmail.com",
//                 'description': 'Buy the chiken in chiken shop and make the chiken',
//                 'category': 'Thai',
//                 'image': 'indian-chiken-food.jpg',
//                 'ingredients': ['Potato', 'Onion', 'Ginger', 'Pudina']
//             },
//             {
//                 'recipeName': "Alu Vaga",
//                 'email': "dasbachan@gmail.com",
//                 'description': 'Cut the Potato and make teh recipe',
//                 'category': 'Thai',
//                 'image': 'indian-potato-food.jpg',
//                 'ingredients': ['Potato', 'Onion', 'Ginger', 'Pudina']
//             },
//             {
//                 'recipeName': "Maggie",
//                 'email': "saikatdas@gmail.com",
//                 'description': 'Open the maggie packet and 5 mnt to ready maggie',
//                 'category': 'Thai',
//                 'image': 'indian-food.jpg',
//                 'ingredients': ['Potato', 'Onion', 'Ginger', 'Pudina']
//             },

//         ])
//     } catch (error) {
//         console.log('err: ' + error);
//     }
// }
// insertDymmyRecipe()