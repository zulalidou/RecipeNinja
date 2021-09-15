const express = require('express')
const router = express.Router()
const got = require('got')
const mongoose = require('mongoose')


const CONNECTION_URI = process.env.MONGODB_URI
mongoose.connect(CONNECTION_URI, { useUnifiedTopology: true, useNewUrlParser: true })

const RECIPE_SCHEMA = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  servings: String,
  readyInMinutes: Number,
  license: String,
  sourceName: String,
  sourceUrl: String,
  analyzedInstructions: [],
  creditsText: String,
  cuisines: [String],
  dairyFree: String,
  diets: [String],
  glutenFree: String,
  instructions: String,
  ketogenic: String,
  vegan: false,
  vegetarian: false,
  dishTypes: [String],
  extendedIngredients: [],
  summary: String,
  winePairing: {},
  similarRecipes: []
})


router.get('/', async function (req, res) {
    // 1. Check the db to see if I have the recipe info stored there. If yes, go to step2, else go to step3.
    // 2. Retrieve the recipe from the DB, and send it to the client. THE END.
    // 3. Get the recipe's data using the fetch api.
    // 4. Store the recipe data from step3 into the db.
    // 5. Return the retrieved recipe. THE END.

    console.log('\n\n/api/get-recipe-info called')

    recipeInfo = await getRecipeInfoFromDB(req.query.recipeID)

    if (recipeInfo === null) {
        recipeInfo = await getRecipeInfoFromAPI(req.query.recipeID)
        await saveRecipeInfo(recipeInfo)
    }

    console.log("\n\n=============================================")
    console.log('recipeInfo::\n')
    console.log(recipeInfo)
    console.log("=============================================\n\n")

    res.status(200).send(recipeInfo)
})


async function getRecipeInfoFromDB(recipeID) {
    console.log("\n\ngetRecipeInfoFromDB()")

    /*
     * The 1st argument in the model function below is the name of the collection (or table) that the model is for.
     * - The name of the collection is in lowercase and plural
     * The 2nd argument is the schema for the model.
     */
    const recipeInfoModel = mongoose.model('recipeinfos', RECIPE_SCHEMA)

    let recipeInfo = null

    await recipeInfoModel.findOne({id: recipeID})
        .then(function(doc) {
            recipeInfo = doc
        })
        .catch((error) => {
            console.log("Error message: " + error)
        })

    return recipeInfo
}


async function getRecipeInfoFromAPI(recipeID) {
    console.log("\n\ngetRecipeInfoFromAPI()\n\n")

    const url = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_API_KEY}`
    const response = await got(url)
    const recipeInfo = JSON.parse(response.body)

    delete recipeInfo.veryHealthy
    delete recipeInfo.cheap
    delete recipeInfo.veryPopular
    delete recipeInfo.sustainable
    delete recipeInfo.weightWatcherSmartPoints
    delete recipeInfo.gaps
    delete recipeInfo.lowFodmap
    delete recipeInfo.aggregateLikes
    delete recipeInfo.spoonacularScore
    delete recipeInfo.healthScore
    delete recipeInfo.pricePerServing
    delete recipeInfo.imageType
    delete recipeInfo.occasions
    delete recipeInfo.originalId


    const similarRecipes = await getSimilarRecipes(recipeID)

    recipeInfo.similarRecipes = []

    for (const recipe of similarRecipes) {
        recipeInfo.similarRecipes.push({
            id: recipe.id,
            title: recipe.title,

            /*
             * Since the '/similar' endpoint in the spoonacular api (which we called earlier in this function)
             * doesn't return the recipes' images, another request is made with the api to retrieve it.
             */
            image: await getRecipeImage(recipe.id)
        })
    }


    console.log('\n\nrecipeInfo.similarRecipes...')
    console.log(recipeInfo.similarRecipes)
    console.log("=============================================\n\n")

    return recipeInfo
}


async function getSimilarRecipes(recipeID) {
    console.log("\n\ngetSimilarRecipes()\n\n")

    const url = `https://api.spoonacular.com/recipes/${recipeID}/similar?number=3&apiKey=${process.env.SPOONACULAR_API_KEY}`
    const response = await got(url)
    const similarRecipes = JSON.parse(response.body)

    console.log('similarRecipes:')
    console.log(similarRecipes)
    console.log("=============================================\n\n")

    return similarRecipes
}


async function getRecipeImage(recipeID) {
    const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`
    const response = await got(url)
    const responseBody = JSON.parse(response.body)

    return responseBody.image
}


// Stores the recipe info into the database
function saveRecipeInfo(recipeInfo) {
    console.log('\n\nsaveRecipeInfo()\n\n')
    console.log('___recipeInfo___:\n')
    console.log(recipeInfo)
    console.log('-------------------------------------------------------------------\n\n')

    /*
     * The 1st argument in the model function below is the name of the collection (or table) that the model is for.
     * - The name of the collection is in lowercase and plural
     * The 2nd argument is the schema for the model.
     */
    const recipeModel = mongoose.model('recipeinfos', RECIPE_SCHEMA)
    const data = new recipeModel(recipeInfo)
    data.save()
}


module.exports = router
