import React, {useState, useEffect} from 'react';
import '../styles/home.css';
import * as Constants from '../constants';
import clientDb from '../client-database';
import RecipeCard from './recipe-card';
import Error from './error';
import DarkBackground from './dark-background';

const NUM_OF_RECIPES = 12;


// Displays the homepage recipes (or an error msg if anything goes wrong)
const displayRecipes = async (displayErrorMsg,
    setRandomRecipes,
    setMainCourseRecipes,
    setSideDishRecipes,
    setDessertRecipes,
    setBeverageRecipes) => {
  document.title = 'RecipeNinja | Your #1 Stop For Learning About All The' +
                    'World\'s Foods';

  console.log('displayRecipes()');

  if (clientDb.recipes === undefined) {
    displayErrorMsg(true);
    return;
  }


  // Checks to see if the recipes are already in the client db
  const [
    mainCourses,
    sideDishes,
    desserts,
    beverages,
  ] = await clientDb.recipes.bulkGet([
    'main_courses_homepage',
    'side_dishes_homepage',
    'desserts_homepage',
    'beverages_homepage',
  ]);

  fetchRecipes(mainCourses,
      'main courses',
      'main_courses_homepage',
      setMainCourseRecipes,
      displayErrorMsg);

  fetchRecipes(sideDishes,
      'side dishes',
      'side_dishes_homepage',
      setSideDishRecipes,
      displayErrorMsg);

  fetchRecipes(desserts,
      'desserts',
      'desserts_homepage',
      setDessertRecipes,
      displayErrorMsg);

  fetchRecipes(beverages,
      'beverages',
      'beverages_homepage',
      setBeverageRecipes,
      displayErrorMsg);

  const randomRecipes = await getRandomRecipes();

  if (randomRecipes === Constants.ERROR) {
    displayErrorMsg(true);
    setRandomRecipes([]);
  } else {
    setRandomRecipes(randomRecipes);
  }
};


/*
 * Attempts to fetch categorical recipes (using another function). I anything
 * fails, the error component gets displayed
 */
const fetchRecipes = async (recipes,
    recipeType,
    clientDbRecipeType,
    setRecipes,
    displayErrorMsg) => {
  if (recipes === undefined) {
    recipes = await getCategoricalRecipes('type', recipeType);

    if (recipes === Constants.ERROR) {
      displayErrorMsg(true);
      setRecipes([]);
    } else {
      setRecipes(recipes);
    }

    clientDb.recipes.add({
      searchTerm: clientDbRecipeType,
      recipes: recipes,
    });
  } else {
    setRecipes(recipes.recipes);
  }
};


/*
 * Retrieves recipes based on the parameters passed
 * - 1st parameter (category): Can be either 'type' or 'cuisine'
 * - 2nd parameter (value): Can take the value of any of the navbar items"
 *   - ['Main courses', 'Side Dishes', 'Americas', 'Middle Eastern', (...)]
 */
const getCategoricalRecipes = async (category, value) => {
  console.log('getCategoricalRecipes()');

  try {
    const response = await fetch('/api/get-categorical-recipes?' +
        `category=${category}&categoryValue=${value}&` +
        `NUM_OF_RECIPES=${NUM_OF_RECIPES}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.log('ERROR: Couldn\'t retrieve categorical recipes');
    return Constants.ERROR;
  }
};


// Retrieves random recipes from the API
const getRandomRecipes = async () => {
  console.log('getRandomRecipes()');

  try {
    const response = await fetch('/api/get-random-recipes?' +
        `NUM_OF_RECIPES=${NUM_OF_RECIPES}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.log('ERROR: Couldn\'t retrieve random recipes');
    return Constants.ERROR;
  }
};


const Home = () => {
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [mainCourseRecipes, setMainCourseRecipes] = useState(null);
  const [sideDishRecipes, setSideDishRecipes] = useState(null);
  const [dessertRecipes, setDessertRecipes] = useState(null);
  const [beverageRecipes, setBeverageRecipes] = useState(null);
  const [showErrorMsg, setShowErrorMsg] = useState(false);


  /*
   * Opens the client database, so we can retrieve recipes from it
   * (assuming it isn't empty)
   */
  useEffect(() => {
    clientDb.open().then(function(clientDb) {})
        .catch(function(err) {
          console.log('The client database couldn\'t not open for some reason');
          setShowErrorMsg(true);
        });
  }, []);

  /*
   * Retrieves recipes from the client database opened in the previous useEffect
   */
  useEffect(() => {
    displayRecipes(setShowErrorMsg,
        setRandomRecipes,
        setMainCourseRecipes,
        setSideDishRecipes,
        setDessertRecipes,
        setBeverageRecipes);
  }, []);


  return (
    <div className='body'>
      <h1 className='homepage-header'>Random Recipes</h1>

      <div className='recipe-cards-container'>
        {
          randomRecipes !== null &&

          randomRecipes.map((recipeInfo) => {
            return (
              <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
            );
          })
        }
      </div>

      <h1 className='homepage-header'>Main Course Meals</h1>

      <div className='recipe-cards-container'>
        {
          mainCourseRecipes !== null &&

          mainCourseRecipes.map((recipeInfo) => {
            return (
              <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
            );
          })
        }
      </div>

      <h1 className='homepage-header'>Side Dishes</h1>

      <div className='recipe-cards-container'>
        {
          sideDishRecipes !== null &&

          sideDishRecipes.map((recipeInfo) => {
            return (
              <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
            );
          })
        }
      </div>

      <h1 className='homepage-header'>Desserts</h1>

      <div className='recipe-cards-container'>
        {
          dessertRecipes !== null &&

          dessertRecipes.map((recipeInfo) => {
            return (
              <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
            );
          })
        }
      </div>

      <h1 className='homepage-header'>Beverages</h1>

      <div className='recipe-cards-container bottom-container'>
        {
          beverageRecipes !== null &&

          beverageRecipes.map((recipeInfo) => {
            return (
              <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
            );
          })
        }
      </div>

      {
        showErrorMsg &&
        <div>
          <Error closeComponent={() => setShowErrorMsg(false)}/>
          <DarkBackground />
        </div>
      }
    </div>
  );
};


export default Home;
