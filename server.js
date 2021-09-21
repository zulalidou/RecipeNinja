/*
 * @fileoverview This is the entry point of the app. It sets up the server,
 * and it creates the routes the app uses.
 */


/*
 * If the app isn't in production mode, then it's most likely running in
 * development mode
 */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


// Modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const helmet = require('helmet');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './client/build')));
app.use(helmet());


// Routes
const getRandomRecipesRoute = require('./routes/get-random-recipes');
const getCategoricalRecipesRoute = require('./routes/get-categorical-recipes');
const getSearchedRecipesRoute = require('./routes/get-searched-recipes');
const getRecipeInfoRoute = require('./routes/get-recipe-info');

app.use('/api/get-random-recipes', getRandomRecipesRoute);
app.use('/api/get-categorical-recipes', getCategoricalRecipesRoute);
app.use('/api/get-searched-recipes', getSearchedRecipesRoute);
app.use('/api/get-recipe-info', getRecipeInfoRoute);


// handles access to routes that do not exist
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});


const PORT = process.env.PORT || 9000;

app.listen(PORT, function() {
  console.log(`\nListening on port ${PORT}`);
});
