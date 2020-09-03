const express = require('express')
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
  image: String
})


router.get('/', function (req, res) {
    let foodCategory = req.url.substr(req.url.indexOf("=") + 1)
    foodCategory = foodCategory.split("%20").join(" ")

    var recipe = mongoose.model(foodCategory, recipeSchema)

    console.log("\n\n=====================")
    console.log("foodCategory: " + foodCategory)

    recipe.find()
        .then(function(doc) {
            console.log(doc)
            console.log("=====================")
            res.send(doc)
        })
})


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
