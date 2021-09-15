const express = require('express')
const router = express.Router()
const got = require('got')


router.get('/', async function (req, res) {
    console.log("\n/api/get-searched-recipes called")

    recipes = await getRecipesFromAPI(req.query.foodSearched)
    res.status(200).send(recipes)
})


async function getRecipesFromAPI(foodSearched) {
    console.log("\n\ngetRecipesFromAPI()\n\n")

    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${foodSearched}&number=100&apiKey=${process.env.SPOONACULAR_API_KEY}`

    let response = null

    try {
        response = await got(url)
    } catch (e) {
        console.log("An error occurred - get-searched-recipes route - getRecipesFromAPI()")
    }

    const recipesFound = JSON.parse(response.body).results
    let recipes = []

    for (let i = 0; i < recipesFound.length; i++) {
        let recipeInfo = {
            id: recipesFound[i].id,
            title: recipesFound[i].title,
            image: (recipesFound[i].image === undefined) ? '../images/plate.png' : `https://spoonacular.com/recipeImages/${recipesFound[i].id}-556x370.jpg`
        }

        recipes.push(recipeInfo)
    }

    console.log('\nrecipes:')
    console.log(recipes)
    console.log('=====================================================\n\n')
    return recipes
}


module.exports = router
