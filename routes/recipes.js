const express = require('express')
const path = require('path')
const got = require('got')
const router = express.Router()
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/foodconnoisseurDB")

let recipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String
})


router.get('/', function (req, res) {
    let parameter = req.url.split(",")
    let foodSearched = ""
    let API_PARAMETER = ""

    foodSearched = parameter[0].substr(parameter[0].indexOf("=") + 1).split("%20").join(" ") // key === ("foodCategory" || "randomRecipes" || "type")

    if (parameter.length == 2) API_PARAMETER = parameter[1].substr(parameter[1].indexOf("=") + 1).split("%20").join(" ")
    else API_PARAMETER = "null"

    console.log("\n\n===================================")
    console.log("foodSearched => " + foodSearched)
    console.log("API_PARAMETER => " + API_PARAMETER)
    console.log("===================================\n")

    let data = Object()

    let recipesInDB = undefined // a boolean

    response = getRecipesFromDB(foodSearched) // the function returns a promise

    // "response" is a Promise object, while "data" is the value stored within the Promise object (the Promise object being "response" in this case)
    response.then(function(data) {
       if (data.length === 0) {
           recipesInDB = false
           response = getRecipesFromAPI(foodSearched, API_PARAMETER)
           return response
       }
       else {
           recipesInDB = true
           return response
       }
    })
    .then(function(data) {
        console.log("\n\n..when the sun go down")
        console.log(data)

        if (!recipesInDB) {
            // console.log("\n\n.. and juliet.. is the sun!\n\n")
            storeRecipesInDB(foodSearched, data)
            res.send(data)
        }
        else
            res.send(data)
    })
})


async function getRecipesFromDB(value) {
    let foodCategory = value
    var recipe = mongoose.model(foodCategory, recipeSchema)

    console.log("foodCategory: " + foodCategory)

    let data = null

    await recipe.find()
        .then(function(doc) {
            data = doc
        })

    return data
}


async function getRecipesFromAPI(foodSearched, API_PARAMETER) {
    let url = ""
    let propertyName = ""

    if (API_PARAMETER !== "null") {
        url = "https://api.spoonacular.com/recipes/complexSearch?" + API_PARAMETER + "=" + foodSearched + "&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
        propertyName = "results"
    }
    else if (foodSearched === "random foods") {
        url = "https://api.spoonacular.com/recipes/random?number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
        propertyName = "recipes"
    }
    else {
        url = "https://api.spoonacular.com/recipes/search?query=" + foodSearched + "&instructionsRequired=true&number=100&apiKey=c27618bedd4b4071b925b766be18e0a4"
        propertyName = "results"
    }

    let response = await got(url)
    let recipesFound = JSON.parse(response.body)[propertyName]
    let recipes = []

    // console.log("\n\n" + propertyName)
    // console.log("recipesFound ------------------>")
    // console.log(recipesFound)
    // console.log("\n\n")


    for (let i = 0; i < recipesFound.length; i++) {
        let recipeInfo = Object()
        recipeInfo["id"] = recipesFound[i].id
        recipeInfo["title"] = recipesFound[i].title
        recipeInfo["image"] = (recipesFound[i].image === undefined) ? "/images/plate.png" : "https://spoonacular.com/recipeImages/" + recipesFound[i].id+ "-556x370.jpg"
        recipes.push(recipeInfo)
    }

    return recipes
}


function storeRecipesInDB(_foodSearched, recipes) {
    let foodSearched = _foodSearched
    var recipe = mongoose.model(foodSearched, recipeSchema)

    // console.log("recipes below my nigg-nigg")
    // console.log(recipes)

    for (let i = 0; i < recipes.length; i++) {
        let item = {
            id: recipes[i]["id"],
            title: recipes[i]["title"],
            image: recipes[i]["image"]
        }

        let data = new recipe(item)
        data.save()
    }
}



// This probably isn't even called anymore, so is it even still needed??
router.post('/', function(req, res) {
    console.log(req.body)

    let foodCategory = req.body.foodCategory
    foodCategory = foodCategory.split("%20").join(" ")

    var recipe = mongoose.model(foodCategory, recipeSchema)


    console.log("\n\n\n\n>>>>>>>>>>>>>>>>>>>>>")

    for (let i = 0; i < req.body.recipes.length; i++) {
        let item = {
            id: req.body.recipes[i]["id"],
            title: req.body.recipes[i]["title"],
            image: req.body.recipes[i]["image"]
        }

        let data = new recipe(item)
        data.save()
    }
})

module.exports = router


// SHOULDN'T I BE CLOSING THE DB??
