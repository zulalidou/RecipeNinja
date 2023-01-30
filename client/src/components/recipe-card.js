import React from 'react';
import '../styles/recipe-card.css';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import PlateIcon from '../images/plate.png';


/*
 * When a RecipeCard is clicked, this function executes. It sends the user to
 * the recipes page to learn more about the recipe they clicked on.
 **/
const displayRecipeInfo = (history, recipeID) => {
  history.push({
    pathname: `/recipes/${recipeID}`,
    state: {
      recipeID: recipeID,
    },
  });
};


const RecipeCard = (props) => {
  const history = useHistory();
  
  if (props.recipeInfo.image == "/client/src/images/plate.png") {
    console.log(props.recipeInfo.image);
  }

  return (
    <div className="recipe-card"
      onClick={() => displayRecipeInfo(history, props.recipeInfo.id)}>
      <div className="recipe-card-img-container">
        <img src={PlateIcon && props.recipeInfo.image} alt='food'/>
      </div>

      <p className="recipe-card-title-container">{props.recipeInfo.title}</p>
    </div>
  );
};


RecipeCard.propTypes = {
  recipeInfo: PropTypes.object,
};


export default RecipeCard;
