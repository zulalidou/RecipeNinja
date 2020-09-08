const express = require('express')
const got = require('got')
const path = require('path')
const router = express.Router()
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/foodconnoisseurDB")

let recipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  nutrition: Array,
  ingredients: Array,
  dishTypes: Array,
  cuisines: Array,
  diets: Array,
  servings: Number,
  instructions: Array,
  credits: Array,
  similarRecipes: Array
})


router.get('/', async function (req, res) {
    const parameter = req.url.split(",")
    const recipeID = parameter[0].substr(parameter[0].indexOf("=") + 1)
    const recipeTitle = parameter[1].substr(parameter[1].indexOf("=") + 1).split("%20").join(" ")

    let recipe = mongoose.model("__DETAILED__RECIPE__INFO__", recipeSchema)

    let recipeInfo = await getRecipeFromDB(recipe, recipeID)

    if (isEmpty(recipeInfo)) {
        recipeInfo = await getRecipeFromAPI(recipeID)
        const similarRecipes = await getSimilarRecipes(recipeID, recipeTitle)
        recipeInfo["similarRecipes"] = similarRecipes
        storeRecipeInDB(recipeInfo)
    }

    res.send(recipeInfo)
})


function isEmpty(recipeInfo) {
    for(let property in recipeInfo) {
        if(recipeInfo.hasOwnProperty(property))
            return false
    }

    return true
}


async function getRecipeFromDB(recipe, recipeID) {
    let recipeInfo = null

    await recipe.findOne({"id": recipeID})
            .then(function(doc) {
                if (doc === null)
                    doc = {}

                recipeInfo = doc
            })

    return recipeInfo
}


async function getRecipeFromAPI(recipeID) {
    const url = "https://api.spoonacular.com/recipes/" + recipeID + "/information?includeNutrition=true&apiKey=c27618bedd4b4071b925b766be18e0a4"

    const response = await got(url)
    const data = JSON.parse(response.body)

    let recipeInfo = Object()
    recipeInfo["id"] = data.id
    recipeInfo["title"] = data.title
    recipeInfo["image"] = data.image
    recipeInfo["nutrition"] = getNutrients(data.nutrition.nutrients)
    recipeInfo["ingredients"] = getIngredients(data.extendedIngredients)
    recipeInfo["cuisines"] = data.cuisines
    recipeInfo["diets"] = data.diets
    recipeInfo["dishTypes"] = data.dishTypes
    recipeInfo["servings"] = data.servings

    let instructions = (data.analyzedInstructions.length === 0) ? [] : data.analyzedInstructions[0].steps
    recipeInfo["instructions"] = getInstructions(instructions)
    recipeInfo["credits"] = getCredits(data)

    return recipeInfo
}


function getNutrients(nutrientsArray) {
    let storedNutrients = []

    for (let i = 0; i < nutrientsArray.length; i++)
        storedNutrients.push(" " + nutrientsArray[i].title + " = " + nutrientsArray[i].amount + " " + nutrientsArray[i].unit + " |")

    storedNutrients = storedNutrients.sort()
    storedNutrients[storedNutrients.length-1] = storedNutrients[storedNutrients.length-1].replace(" |", "")
    return storedNutrients
}


function getIngredients(ingredientsArray) {
    let storedIngredients = []

    for (let i = 0; i < ingredientsArray.length; i++) {
        let ingredient = ingredientsArray[i].name + " (" + ((Number.isInteger(ingredientsArray[i].amount)) ? ingredientsArray[i].amount : ingredientsArray[i].amount.toFixed(2))

        if (ingredientsArray[i].unit === "") ingredient += ")"
        else ingredient += " " + ingredientsArray[i].unit + ")"

        storedIngredients.push(ingredient)
    }

    return storedIngredients
}


function getInstructions(instructionsArray) {
    let storedInstructions = []

    for (let i = 0; i < instructionsArray.length; i++) {
        let stepInfo = []
        stepInfo.push(instructionsArray[i].step)

        let ingredientsForThisStep = []
        for (let j = 0; j < instructionsArray[i].ingredients.length; j++)
            ingredientsForThisStep.push(instructionsArray[i].ingredients[j].name)

        let equipmentsForThisStep = []
        for (let j = 0; j < instructionsArray[i].equipment.length; j++)
            equipmentsForThisStep.push(instructionsArray[i].equipment[j].name)

        stepInfo.push(ingredientsForThisStep)
        stepInfo.push(equipmentsForThisStep)
        storedInstructions.push(stepInfo)
    }

    return storedInstructions
}


function getCredits(data) {
    let creditsArray = []

    if (data.creditsText !== undefined && data.creditsText !== null)
        creditsArray.push("Author: " + data.creditsText)

    if (data.sourceUrl !== undefined && data.sourceUrl !== null)
        creditsArray.push("Source: " + data.sourceUrl)

    if (data.license !== undefined && data.license !== null)
        creditsArray.push("License: " + data.license)

    return creditsArray
}


async function getSimilarRecipes(recipeID, recipeTitle) {
    const url = "https://api.spoonacular.com/recipes/search?query=" + recipeTitle + "&instructionsRequired=true&apiKey=c27618bedd4b4071b925b766be18e0a4"

    const response = await got(url)
    let recipesFound = JSON.parse(response.body).results

    let similarRecipes = []

    let i = 0
    while (i < recipesFound.length) {
        if (recipesFound[i].id === recipeID)
            continue

        const recipeInfo = {"id": recipesFound[i].id, "title": recipesFound[i].title, "image": "https://spoonacular.com/recipeImages/" + recipesFound[i].id + "-556x370.jpg"}
        similarRecipes.push(recipeInfo)

        if (similarRecipes.length === 3)
            break
        i++
    }

    if (similarRecipes.length < 3) {
        const recommendedRecipes = await getRandomRecipes(Math.abs(similarRecipes.length - 3))

        for (let i = 0; i < recommendedRecipes.length; i++)
            similarRecipes.push(recommendedRecipes[i])
    }

    return similarRecipes
}


async function getRandomRecipes(recipesNeeded) {
    // console.log("\n\nrecipesNeeded = " + recipesNeeded)

    const url = "https://api.spoonacular.com/recipes/random?number=" + recipesNeeded + "&apiKey=c27618bedd4b4071b925b766be18e0a4"
    const response = await got(url)

    const randomRecipes = JSON.parse(response.body).recipes
    let recommendedRecipes = []

    for (let i = 0; i < randomRecipes.length; i++) {
        let recipeInfo = {id: randomRecipes[i].id, title: randomRecipes[i].title, image: randomRecipes[i].image}
        recommendedRecipes.push(recipeInfo)
    }

    return recommendedRecipes
}


function storeRecipeInDB(recipeInfo) {
    var recipe = mongoose.model("__DETAILED__RECIPE__INFO__", recipeSchema)

    let data = new recipe(recipeInfo)
    data.save()
}




// Not using this, so I might have to delete it
// router.post('/', function(req, res) {
//     const collectionName = "__DETAILED__RECIPE__INFO__"
//     var recipe = mongoose.model(collectionName, recipeSchema)
//
//     console.log("\n\n\n\n\n=============================================")
//     console.log(req.body)
//
//     let data = new recipe(req.body)
//     data.save()
//     console.log("=============================================")
//
// })

module.exports = router
