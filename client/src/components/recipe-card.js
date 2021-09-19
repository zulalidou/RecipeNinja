import React from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';

import '../styles/recipe-card.css';


const displayRecipeInfo = (history, recipeID) => {
  console.log('displayRecipeInfo()');
  history.push({
    pathname: `/recipes/${recipeID}`,
    state: {
      recipeID: recipeID,
    },
  });
};

const RecipeCard = (props) => {
  const history = useHistory();
  console.log(props);

  return (
    <div className="recipe-card"
      onClick={() => displayRecipeInfo(history, props.recipeInfo.id)}>
      <div className="recipe-card-img-container">
        <img src={props.recipeInfo.image} alt='food'/>
      </div>

      <p className="recipe-card-title-container">{props.recipeInfo.title}</p>
    </div>
  );
};


RecipeCard.propTypes = {
  recipeInfo: PropTypes.object,
};


export default RecipeCard;
