import React, {useState, useEffect} from 'react';
import '../styles/home.css';
import RecipeCard from './recipe-card';
import Error from './error';
import DarkBackground from './dark-background';
import db from '../client-database';


const NUM_OF_RECIPES = 12;


const getRandomRecipes = async () => {
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
    console.log('An error occurred - Couldn\'t retrieve the recipes');
    console.log(err);
    return [];
  }
};

const getCategoricalRecipes = async (category, value) => {
  try {
    const response = await fetch(`/api/get-categorical-recipes?
        category=${category}&
        categoryValue=${value}&
        NUM_OF_RECIPES=${NUM_OF_RECIPES}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.log('An error occurred - Couldn\'t retrieve the recipes');
    console.log(err);
    return [];
  }
};


const Home = () => {
  const [recipesRetrieved, setRecipesRetrieved] = useState(false);
  const [randomRecipes, setRandomRecipes] = useState(null);
  const [mainCourseRecipes, setMainCourseRecipes] = useState(null);
  const [sideDishRecipes, setSideDishRecipes] = useState(null);
  const [dessertRecipes, setDessertRecipes] = useState(null);
  const [beverageRecipes, setBeverageRecipes] = useState(null);

  console.log('hello world!');


  // Handle the case when the db couldn't be opened
  db.open().then(function(db) {
    console.log('Database opened successfully');
  }).catch(function(err) {
    console.log('Database couldn\'t not open for some reason');
    console.log(err);

    return (
      <div>
        <Error />
        <DarkBackground />
      </div>
    );
  });


  useEffect(() => {
    async function fetchData() {
      if (!recipesRetrieved) {
        document.title = 'RecipeNinja | Your #1 Stop For Learning' +
        ' About All The World\'s Foods';

        // Checks to see if the recipes are already in the client db
        let [
          mainCourses,
          sideDishes,
          desserts,
          beverages,
        ] = await db.recipes.bulkGet([
          'main_courses_homepage',
          'side_dishes_homepage',
          'desserts_homepage',
          'beverages_homepage',
        ]);

        if (mainCourses === undefined) {
          mainCourses = await getCategoricalRecipes('type', 'main courses');
          setMainCourseRecipes(mainCourses);
          db.recipes.add({
            searchTerm: 'main_courses_homepage',
            recipes: mainCourses,
          });
        } else {
          setMainCourseRecipes(mainCourses.recipes);
        }

        if (sideDishes === undefined) {
          sideDishes = await getCategoricalRecipes('type', 'side dishes');
          setMainCourseRecipes(sideDishes);
          db.recipes.add({
            searchTerm: 'side_dishes_homepage',
            recipes: sideDishes,
          });
        } else {
          setSideDishRecipes(sideDishes.recipes);
        }

        if (desserts === undefined) {
          desserts = await getCategoricalRecipes('type', 'desserts');
          setDessertRecipes(desserts);
          db.recipes.add({searchTerm: 'desserts_homepage', recipes: desserts});
        } else {
          setDessertRecipes(desserts.recipes);
        }

        if (beverages === undefined) {
          beverages = await getCategoricalRecipes('type', 'beverages');
          setBeverageRecipes(beverages);
          db.recipes.add({
            searchTerm: 'beverages_homepage',
            recipes: beverages,
          });
        } else {
          setBeverageRecipes(beverages.recipes);
        }

        setRandomRecipes(await getRandomRecipes());
        setRecipesRetrieved(true);
      }
    }


    fetchData();
  }, [recipesRetrieved]);

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
    </div>
  );
};


export default Home;
