const express = require('express');
const router = express.Router();
const got = require('got');


router.get('/', async function(req, res) {
  console.log('\n/api/get-random-recipes called\n');

  console.log('req.query:')
  console.log(req.query);
  console.log('----------===================--------------==============\n\n')

  const recipes = await getRecipes(req.query.NUM_OF_RECIPES);
  res.status(200).send(recipes);
});


async function getRecipes(NUM_OF_RECIPES) {
  console.log('\n\ngetRecipes()\n\n');

  const url = `https://api.spoonacular.com/recipes/random?number=${NUM_OF_RECIPES}&apiKey=${process.env.SPOONACULAR_API_KEY}`;
  console.log('url = ' + url + '\n');

  const response = await got(url);
  const recipesFound = JSON.parse(response.body).recipes;


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
