const express = require('express');
const router = express.Router();
const got = require('got');
const Constants = require('../constants');


router.get('/', async function(req, res) {
  console.log('\n/api/get-categorical-recipes executing');

  recipes = await getRecipes(req.query.category,
      req.query.categoryValue,
      req.query.NUM_OF_RECIPES);

  if (recipes === Constants.ERROR) {
    res.status(403).send([]);
    return;
  }

  res.status(200).send(recipes);
});


// Retrieves the categorical recipes from the Spoonacular API
async function getRecipes(category, food, NUM_OF_RECIPES) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?${category}=${food}&number=${NUM_OF_RECIPES}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-categorical-recipes');
    return Constants.ERROR;
  }

  const recipesFound = JSON.parse(response.body).results;
  const recipes = [];

  for (recipe of recipesFound) {
    delete recipe.imageType;

    if (recipe.image === undefined) {
      recipe.image = '../images/plate.png';
    }

    recipes.push(recipe);
  }

  return recipes;
}


module.exports = router;
