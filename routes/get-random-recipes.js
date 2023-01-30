const express = require('express');
const router = express.Router();
const got = require('got');
const Constants = require('../constants');


router.get('/', async function(req, res) {
  const recipes = await getRecipes(req.query.NUM_OF_RECIPES);

  if (recipes === Constants.ERROR) {
    res.status(403).send([]);
    return;
  }

  res.status(200).send(recipes);
});


// Retrieves random recipes from the Spoonacular API
async function getRecipes(NUM_OF_RECIPES) {
  const url = `https://api.spoonacular.com/recipes/random?number=${NUM_OF_RECIPES}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-random-recipes');
    return Constants.ERROR;
  }

  const recipesFound = JSON.parse(response.body).recipes;
  const recipes = [];

  for (recipe of recipesFound) {
    const recipeInfo = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image === undefined ? null : recipe.image,
    };

    recipes.push(recipeInfo);
  }

  return recipes;
}


module.exports = router;
