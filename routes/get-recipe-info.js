const express = require('express');
const router = express.Router();
const got = require('got');
const mongoose = require('mongoose');
const Constants = require('../constants');

const CONNECTION_URI = process.env.MONGODB_URI;
mongoose.connect(CONNECTION_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true});

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
  similarRecipes: [],
});


/*
 * It retrieves the recipe info of the recipe id passed.
 *
 * It checks to see if the recipe info is stored in the db. If yes, it grabs it
 * and returns it to the client. Else, it gets the recipe info using the
 * Spoonacular API, it stores that data into the db for future use, and it
 * sends it back to the client.
 */
router.get('/', async function(req, res) {
  recipeInfo = await getRecipeInfoFromDB(req.query.recipeID);

  if (recipeInfo === Constants.ERROR) {
    res.status(403).send([]);
    return;
  }


  if (recipeInfo === null) {
    recipeInfo = await getRecipeInfoFromAPI(req.query.recipeID);

    if (recipeInfo === Constants.ERROR) {
      res.status(403).send([]);
      return;
    }

    const similarRecipes = await getSimilarRecipes(req.query.recipeID);

    if (similarRecipes === Constants.ERROR) {
      res.status(403).send([]);
      return;
    }

    recipeInfo.similarRecipes = [];

    for (recipe of similarRecipes) {
      /*
       * Since the '/similar' endpoint in the spoonacular api (which we called
       * earlier in this function) doesn't return the recipes' images, another
       * request is made with the api to retrieve it.
       */

      const image = await getRecipeImage(recipe.id);

      if (image === Constants.ERROR) {
        res.status(403).send([]);
        return;
      }

      recipeInfo.similarRecipes.push({
        id: recipe.id,
        title: recipe.title,
        image: image,
      });
    }

    await saveRecipeInfo(recipeInfo);
  }


  res.status(200).send(recipeInfo);
});


// Grabs data from the db
async function getRecipeInfoFromDB(recipeID) {
  /*
  * The 1st argument in the model function below is the name of the collection
  * (or table) that the model is for.
  * - The name of the collection is in lowercase and plural
  * The 2nd argument is the schema for the model.
  */
  const recipeInfoModel = mongoose.model('recipeinfos', RECIPE_SCHEMA);

  let recipeInfo = null;

  await recipeInfoModel.findOne({id: recipeID})
      .then(function(doc) {
        recipeInfo = doc;
      })
      .catch((error) => {
        console.log('ERROR: An error occurred - /api/get-recipe-info');
        return Constants.ERROR;
      });

  return recipeInfo;
}


// Gets the recipe info from the Spoonacular API
async function getRecipeInfoFromAPI(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?includeNutrition=false&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-random-recipes');
    return Constants.ERROR;
  }

  const recipeInfo = JSON.parse(response.body);

  delete recipeInfo.veryHealthy;
  delete recipeInfo.cheap;
  delete recipeInfo.veryPopular;
  delete recipeInfo.sustainable;
  delete recipeInfo.weightWatcherSmartPoints;
  delete recipeInfo.gaps;
  delete recipeInfo.lowFodmap;
  delete recipeInfo.aggregateLikes;
  delete recipeInfo.spoonacularScore;
  delete recipeInfo.healthScore;
  delete recipeInfo.pricePerServing;
  delete recipeInfo.imageType;
  delete recipeInfo.occasions;
  delete recipeInfo.originalId;

  return recipeInfo;
}


// Retrieves similar recipes
async function getSimilarRecipes(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/similar?number=3&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-random-recipes');
    return Constants.ERROR;
  }

  const similarRecipes = JSON.parse(response.body);
  return similarRecipes;
}


// Retrieves the image of the recipe whose id was passed into this function
async function getRecipeImage(recipeID) {
  const url = `https://api.spoonacular.com/recipes/${recipeID}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-random-recipes');
    return Constants.ERROR;
  }

  const image = JSON.parse(response.body).image;

  if (image === undefined) {
    return '/client/src/images/plate.png';
  }

  return image;
}


// Stores the recipe info into the database
function saveRecipeInfo(recipeInfo) {
  /*
   * The 1st argument in the model function below is the name of the collection
   * (or table) that the model is for.
   * - The name of the collection is in lowercase and plural
   * The 2nd argument is the schema for the model.
   */
  const RecipeModel = mongoose.model('recipeinfos', RECIPE_SCHEMA);
  const data = new RecipeModel(recipeInfo);
  data.save();
}


module.exports = router;
