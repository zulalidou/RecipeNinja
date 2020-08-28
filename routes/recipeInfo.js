const express = require('express')
const path = require('path')
const router = express.Router()
const bodyParser = require('body-parser')

var app = express();
app.use(bodyParser.json());


const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/foodconnoisseurDB")

let recipeSchema = new mongoose.Schema({
  id: Number,//{type: Number, required: true},
  title: String,//{ type: String, required: true},
  image: String,//{ type: String, required: true},
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

router.get('/', function (req, res) {
    const collectionName = "__DETAILED__RECIPE__INFO__"
    let recipeID = req.url.substr(req.url.indexOf("=") + 1)

    var recipe = mongoose.model(collectionName, recipeSchema)

    console.log("recipeID = " + recipeID)

    recipe.findOne({"id": recipeID})
        .then(function(doc) {
            if (doc === null)
                doc = {}
            res.send(doc)
        })
})



router.post('/', function(req, res) {
    const collectionName = "__DETAILED__RECIPE__INFO__"
    var recipe = mongoose.model(collectionName, recipeSchema)

    console.log("\n\n\n\n\n=============================================")
    console.log(req.body)

    // console.log("\n\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    // console.log(req.body)

    // for (let i = 0; i < req.body.recipes.length; i++) {
    //     // let item = {
    //     //     id: req.body.recipes[i][0],
    //     //     title: req.body.recipes[i][1],
    //     //     image: req.body.recipes[i][2]
    //     // }
    // }

    let data = new recipe(req.body)
    data.save()
    console.log("=============================================")

})

module.exports = router


// SHOULDN'T I BE CLOSING THE DB??
