const express = require('express');
const router = express.Router();
const got = require('got');
const Constants = require('../constants');


router.get('/', async function(req, res) {
  recipes = await getRecipesFromAPI(req.query.food);

  if (recipes === Constants.ERROR) {
    res.status(403).send([]);
    return;
  }

  res.status(200).send(recipes);
});


// Retrieves the recipes using the spoonacular api
async function getRecipesFromAPI(food) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=100&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: An error occurred - /api/get-searched-recipes');
    return Constants.ERROR;
  }

  const recipesFound = JSON.parse(response.body).results;
  const recipes = [];

  for (recipe of recipesFound) {
    const recipeInfo = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image === undefined ? '../images/plate.png' : recipe.image,
    };

    recipes.push(recipeInfo);
  }

  return recipes;
}


module.exports = router;
