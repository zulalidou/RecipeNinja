const express = require('express');
const router = express.Router();
const got = require('got');


router.get('/', async function(req, res) {
  console.log('\n/api/get-categorical-recipes called');

  recipes = await getRecipes(req.query.category, req.query.categoryValue, req.query.NUM_OF_RECIPES);
  res.status(200).send(recipes);
});


async function getRecipes(category, foodSearched, NUM_OF_RECIPES) {
  console.log('\n\ngetRecipesFromAPI()\n\n');

  const url = `https://api.spoonacular.com/recipes/complexSearch?${category}=${foodSearched}&number=${NUM_OF_RECIPES}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  const response = await got(url);
  const recipesFound = JSON.parse(response.body).results;


  const recipes = [];

  for (let i = 0; i < recipesFound.length; i++) {
    const recipeInfo = {
      id: recipesFound[i].id,
      title: recipesFound[i].title,
      image: (recipesFound[i].image === undefined) ? '../images/plate.png' : `https://spoonacular.com/recipeImages/${recipesFound[i].id}-556x370.jpg`,
    };

    recipes.push(recipeInfo);
  }

  console.log('\nrecipes:');
  console.log(recipes);
  console.log('=====================================================\n\n');
  return recipes;
}


module.exports = router;
