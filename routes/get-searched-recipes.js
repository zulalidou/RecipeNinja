const express = require('express');
const router = express.Router();
const got = require('got');


router.get('/', async function(req, res) {
  console.log('\n/api/get-searched-recipes called');
  console.log('\nreq.query below:');
  console.log(req.query);
  console.log('================================================\n\n');

  recipes = await getRecipesFromAPI(req.query.food);
  res.status(200).send(recipes);
});


async function getRecipesFromAPI(food) {
  console.log('\n\ngetRecipesFromAPI()\n\n');

  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${food}&number=100&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  let response = null;

  try {
    response = await got(url);
  } catch (e) {
    console.log('ERROR: Couldn\'t get recipes - getRecipesFromAPI()');
  }

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
