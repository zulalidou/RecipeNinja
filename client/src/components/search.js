import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import '../styles/search.css';
import * as Constants from '../constants';
import clientDb from '../client-database';
import Loading from './loading';
import RecipeCard from './recipe-card';
import Error from './error';
import DarkBackground from './dark-background';


// Retrieves the recipes for the search term(s) used
const getSearchedRecipes = async (food) => {
  try {
    const response = await fetch(`/api/get-searched-recipes?food=${food}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status === 403) {
      return Constants.ERROR;
    }

    const recipes = await response.json();
    return recipes;
  } catch (err) {
    console.log('ERROR: Couldn\'t retrieve search recipes');
    return Constants.ERROR;
  }
};


const SearchResults = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState(null);
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
   * This case occurs if/when the user comes to this page by typing the url into
   * the address bar, instead of clicking links on the website
   */
  if (location.state === undefined) {
    let food = location.search.substring(location.search.indexOf('=') + 1);
    food = food.replace('+', ' ');

    location.state = {
      food: food,
    };
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      document.title = `Search results for ${location.state.food}` +
        ` | RecipeNinja`;

      let searchedRecipes = await clientDb.recipes.get({
        searchTerm: location.state.food,
      });

      if (searchedRecipes === undefined) {
        searchedRecipes = await getSearchedRecipes(location.state.food);

        if (searchedRecipes === Constants.ERROR) {
          setShowErrorMsg(true);
          setSearchResults([]);
        } else {
          setSearchResults(searchedRecipes);
          clientDb.recipes.add({
            searchTerm: location.state.food,
            recipes: searchedRecipes,
          });
        }
      } else {
        setSearchResults(searchedRecipes.recipes);
      }
    };

    fetchRecipes();
  }, [location.state.food]);


  return (
    <div className='body'>
      {(searchResults === null) ?

        <Loading /> :

        <div>
          <h1 className='search-results-header'>
            {searchResults.length} results found for {location.state.food}
          </h1>

          {
            searchResults.length === 0 &&
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


export default SearchResults;
