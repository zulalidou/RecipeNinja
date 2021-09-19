import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';

import db from '../client-database';
import Loading from './loading';
import RecipeCard from './recipe-card';

import '../styles/search.css';


const getSearchedRecipes = async (foodSearched) => {
  try {
    const response = await fetch(`/api/get-searched-recipes?
        foodSearched=${foodSearched}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.log('An error occurred- Couldn\'t retrieve recipes');
    console.log(err);
    return [];
  }
};


const SearchResults = () => {
  const location = useLocation();
  console.log(location);
  const [searchResults, setSearchResults] = useState(null);


  // Handle the case when the db couldn't be opened
  db.open().then(function(db) {
    console.log('Database opened successfully');
  }).catch(function(err) {
    console.log('Database couldn\'t not open for some reason');
    console.log(err);
  });


  useEffect(() => {
    const fetchRecipes = async () => {
      document.title = `Search results for ${location.state.foodSearched}` +
        ` | RecipeNinja`;

      let searchedRecipes = await db.recipes.get({
        searchTerm: location.state.foodSearched,
      });

      console.log(searchedRecipes);

      if (searchedRecipes === undefined) {
        searchedRecipes = await getSearchedRecipes(location.state.foodSearched);
        setSearchResults(searchedRecipes);
        db.recipes.add({
          searchTerm: location.state.foodSearched,
          recipes: searchedRecipes,
        });
      } else {
        setSearchResults(searchedRecipes.recipes);
      }
    };

    fetchRecipes();
  }, [location.state.foodSearched]);


  console.log('hellow');


  return (
    <div className='body'>
      {(searchResults === null) ?

        <Loading /> :

        <div>
          <h1 className='search-results-header'>
            {searchResults.length} results found for
            <em>{location.state.foodSearched}</em>
          </h1>

          {searchResults.length === 0 &&
                <div>
                  <p className='no-search-results'>
                    Please check your spelling and try again
                  </p>
                  <p className='no-search-results'>
                    Try more general words
                  </p>
                </div>

          }

          <div className='recipe-cards-container'>
            {
              searchResults.map((recipeInfo) => {
                return (
                  <RecipeCard key={recipeInfo.id} recipeInfo={recipeInfo}/>
                );
              })
            }
          </div>
        </div>
      }
    </div>
  );
};


export default SearchResults;
