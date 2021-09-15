import React, {useState, useEffect} from 'react'

import Loading from "./loading"
import RecipeCard from './recipe-card';

import '../styles/recipes.css'


const getRecipeInfo = async (recipeID) => {
  // console.log("getRandomRecipes()");
  const recipes = await fetchRecipeInfo(recipeID);
  // console.log(recipes);
  return recipes
}

const getSimilarRecipes = async (recipeID) => {
  // console.log("getSimilarRecipes()");
  const recipes = await fetchSimilarRecipes(recipeID);
  // console.log(recipes);
  return recipes
}

const fetchRecipeInfo = async (recipeID) => {
  let recipeInfo = null;

  // console.log('fetchRecipeInfo()')

  try {
    const response = await fetch(`/api/get-recipe-info?recipeID=${recipeID}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })

    recipeInfo = await response.json()

    return recipeInfo
  } catch (err) {
      console.log("An error occurred - Couldn't retrieve recipes");
      console.log(err);
  }
}

const fetchSimilarRecipes = async (recipeID) => {
  let recipes = null;

  // console.log('fetchRecipeInfo()')

  try {
    const response = await fetch(`/api/get-similar-recipes?recipeID=${recipeID}`, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })

    recipes = await response.json()

    return recipes
  } catch (err) {
      console.log("An error occurred - Couldn't retrieve recipes");
      console.log(err);
  }
}


const Recipes = (props) => {
    // 1. Fetch data using the spoonacular api to retrieve data about the recipe.
    // 2. Display the data retrieved about the recipe

    // console.log(props)
    const [recipeInfo, setRecipeInfo] = useState(null)
    const [similarRecipes, setSimilarRecipes] = useState(null)


    useEffect(() => {
        async function fetchData() {
            const recipeInfo = await getRecipeInfo(props.location.state.recipeID)
            document.title = `${recipeInfo.title} | RecipeNinja`
            setRecipeInfo(recipeInfo)

            const similarRecipes = await getSimilarRecipes(props.location.state.recipeID)
            setSimilarRecipes(similarRecipes)
            window.scrollTo(0, 0)
        }

        fetchData()
    }, [props.location.state.recipeID])

    // console.log(recipeInfo)


    // if (searchResults === null)
    //     <Loading />

    return (
        <div className='body'>
            {
                (recipeInfo === null) ?

                <Loading />

                :

                <div className='recipe-info-container'>
                    <h1 className='recipe-info-name'>{recipeInfo.title}</h1>

                    <div className='recipe-info-top'>
                        <div className='recipe-img-container'>
                            <img className='recipe-img' src={recipeInfo.image} alt='recipe'/>
                        </div>

                        <div className='recipe-facts'>
                            <p><strong>Time to make:</strong> {recipeInfo.readyInMinutes} minutes</p>
                            <p><strong>Servings:</strong> {recipeInfo.servings}</p>
                            <p><strong>Dairy free:</strong> {recipeInfo.dairyFree ? 'Yes' : 'No'}</p>
                            <p><strong>Gluten free:</strong> {recipeInfo.glutenFree ? 'Yes' : 'No'}</p>
                            <p><strong>Vegan:</strong> {recipeInfo.vegan ? 'Yes' : 'No'}</p>
                            <p><strong>Vegetarian:</strong> {recipeInfo.vegetarian ? 'Yes' : 'No'}</p>
                        </div>
                    </div>

                    <div className='recipe-info-middle'>
                        <div className='recipe-diets'>
                            <h2>Diets</h2>

                            <div>
                                {
                                    (recipeInfo.diets.size === 0) ?

                                    <p className='recipe-diet'><strong>N/A</strong></p>

                                    :

                                    recipeInfo.diets.map((item, idx) => {
                                        return <p key={idx} className='recipe-diet'>{item}</p>
                                    })
                                }
                            </div>
                        </div>

                        <div className='recipe-dishtypes'>
                            <h2>Dish Types</h2>

                            <div>
                                {
                                    (recipeInfo.dishTypes.size === 0) ?

                                    <p className='recipe-dishtype'><strong>N/A</strong></p>

                                    :

                                    recipeInfo.dishTypes.map((item, idx) => {
                                        return <p key={idx} className='recipe-dishtype'>{item}</p>
                                    })
                                }
                            </div>
                        </div>

                        <div className='recipe-ingredients'>
                            <h2>Ingredients</h2>

                            <div>
                                {
                                    (recipeInfo.extendedIngredients.size === 0) ?

                                    <p className='recipe-ingredient'><strong>N/A</strong></p>

                                    :

                                    recipeInfo.extendedIngredients.map((item, idx) => {
                                        return <p key={idx} className='recipe-ingredient'>{item.name} - {item.measures.us.amount} {item.measures.us.unitLong}</p>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className='recipe-info-bottom'>
                        <h2>Instructions</h2>

                        <div className='recipe-instructions'>
                            {
                                (recipeInfo.analyzedInstructions.length === 0) ?

                                <p><strong>N/A</strong></p>

                                :

                                recipeInfo.analyzedInstructions[0].steps.map((item, idx) => {
                                    return (
                                        <div key={idx} className='recipe-instruction'>
                                            <h3>Step {item.number}</h3>
                                            <div>{item.step}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <hr className='hr'/>

                    <div className='similar-recipes-container'>
                        <h2>Similar Recipes</h2>

                        <div className='similar-recipes'>
                            {
                                (recipeInfo.similarRecipes.size === 0) ?

                                <p><strong>N/A</strong></p>

                                :

                                recipeInfo.similarRecipes.map((recipeInfo) => {
                                    return <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo} />
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}


export default Recipes
