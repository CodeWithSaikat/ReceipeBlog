const router = require('express').Router()
const receipeController = require('../controlers/recipeControler')

// App routes
router.get('/', receipeController.homepage)
router.get('/viewCategories', receipeController.viewCategories)
router.get('/viewCategories/:id', receipeController.viewCategoriesById)
router.get('/viewRecipes', receipeController.viewRecipes)
router.get('/detailsViewRecipes/:id', receipeController.detailsViewRecipes)
router.post('/search', receipeController.searchRecipe)

router.get('/explore-letest', receipeController.exploreLetest)
router.get('/explore-random', receipeController.exploreRandom)
router.get('/submit-recipe', receipeController.submitRecipe)
router.post('/submit-recipe', receipeController.submitRecipeOnPost)




module.exports = router