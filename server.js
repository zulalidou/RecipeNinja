if (process.env.NODE_ENV !== 'production') {
    // A module that Loads environment variables from a .env file into process.env
    require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser') // body parser middleware. allows access to the "req.body" property
const path = require('path')
const app = express()

const indexRoute = require("./routes/index")
const recipesRoute = require("./routes/recipes")
const recipeInfoRoute = require("./routes/recipeInfo")
const aboutRoute = require("./routes/about")

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public'))) // allows static files (html, css, images, etc) to run

app.use("/", indexRoute)
app.use("/recipes", recipesRoute)
app.use("/recipeInfo", recipeInfoRoute)
app.use("/about", aboutRoute)

const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
    console.log("\nListening on port 3000")
})
