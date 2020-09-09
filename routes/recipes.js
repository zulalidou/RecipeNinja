const express = require('express')
const path = require('path')
const got = require('got')
const router = express.Router()
const bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

const CONNECTION_URI = process.env.MONGODB_URI


const mongoose = require('mongoose')
mongoose.connect(CONNECTION_URI, { useUnifiedTopology: true, useNewUrlParser: true })

let recipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String
})


router.get('/', function (req, res) {
    const parameter = req.url.split(",")
    let foodSearched = ""
    let API_PARAMETER = ""

    foodSearched = parameter[0].substr(parameter[0].indexOf("=") + 1).split("%20").join(" ")

    if (parameter.length == 2)
        API_PARAMETER = parameter[1].substr(parameter[1].indexOf("=") + 1).split("%20").join(" ")
    else
        API_PARAMETER = "null"

    // a boolean
    let recipesInDB = undefined

    response = getRecipesFromDB(foodSearched)

    // "response" is a Promise object, while "data" is the value stored within the Promise object
    response.then(function(data) {
       if (data.length === 0) {
           recipesInDB = false
           response = getRecipesFromAPI(foodSearched, API_PARAMETER)
           return response
       }
       else {
           console.log(data[0])
           recipesInDB = true
           return data
       }
    })
    .then(function(data) {
        if (!recipesInDB) {
            storeRecipesInDB(foodSearched, data)
            res.send(data)
        }
        else {
            console.log(data[0])
            res.send(data)
        }
    })
    .catch( (error) => {
        console.log("Error message: " + error)
        // Maybe I should have an error file sent to the browser, telling the user that
        // the recipes were not able to be retrieved??
    })
})


async function getRecipesFromDB(foodSearched) {
    var recipe = mongoose.model(foodSearched, recipeSchema)

    let data = null

    await recipe.find()
        .then(function(doc) {
            data = doc
        })
        .catch( (error) => {
            console.log("Error message: " + error)
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

    for (let i = 0; i < recipesFound.length; i++) {
        let recipeInfo = Object()
        recipeInfo["id"] = recipesFound[i].id
        recipeInfo["title"] = recipesFound[i].title
        recipeInfo["image"] = (recipesFound[i].image === undefined) ? "/images/plate.png" : "https://spoonacular.com/recipeImages/" + recipesFound[i].id+ "-556x370.jpg"
        recipes.push(recipeInfo)
    }

    return recipes
}


function storeRecipesInDB(foodSearched, recipes) {
    var recipe = mongoose.model(foodSearched, recipeSchema)

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
// router.post('/', function(req, res) {
//     console.log(req.body)
//
//     let foodCategory = req.body.foodCategory
//     foodCategory = foodCategory.split("%20").join(" ")
//
//     var recipe = mongoose.model(foodCategory, recipeSchema)
//
//
//     console.log("\n\n\n\n>>>>>>>>>>>>>>>>>>>>>")
//
//     for (let i = 0; i < req.body.recipes.length; i++) {
//         let item = {
//             id: req.body.recipes[i]["id"],
//             title: req.body.recipes[i]["title"],
//             image: req.body.recipes[i]["image"]
//         }
//
//         let data = new recipe(item)
//         data.save()
//     }
// })

module.exports = router
