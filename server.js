const express = require('express')
require('dotenv').config()
// const mongoose = require('mongoose')
const bodyParser = require('body-parser') // body parser middleware. allows access to the "req.body" property
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const indexRoute = require("./routes/index")
const recipesRoute = require("./routes/recipes")
const recipeInfoRoute = require("./routes/recipeInfo")
const aboutRoute = require("./routes/about")

// mongoose.connect(process.env.DATABASE_URL || "mongodb://localhost:27017/foodconnoisseurDB")
//"mongodb://localhost:27017/foodconnoisseurDB"

// mongoose.model("usercollection", {username: String, email: String})

//const db = require('./db')
//const collection = "randomRecipes"


app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public'))) // allows static files (html, css, images, etc) to run

app.use("/", indexRoute)
app.use("/recipes", recipesRoute)
app.use("/recipeInfo", recipeInfoRoute)
app.use("/about", aboutRoute)

app.listen(port, function() {
    console.log("\nListening on port 3000.")
})
