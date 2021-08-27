/*
 * @fileoverview This is the entry point of the app. It sets up the server,
 * and it creates the routes the app uses.
 */


/*
 * If the app isn't in production mode, then it's most likely running in
 * development mode
 */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


// Modules
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const helmet = require('helmet')

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '/public')))
app.use(helmet())


// Routes
const indexRoute = require("./routes/index")
const recipesRoute = require("./routes/recipes")
const recipeInfoRoute = require("./routes/recipeInfo")
const aboutRoute = require("./routes/about")

app.use("/", indexRoute)
app.use("/recipes", recipesRoute)
app.use("/recipeInfo", recipeInfoRoute)
app.use("/about", aboutRoute)


const PORT = process.env.PORT || 3000

app.listen(PORT, function() {
    console.log(`\nListening on port ${PORT}`)
})
