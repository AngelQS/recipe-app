import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Initializations
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

class Recipe extends Component {
  state = {
    currentRecipe: [],
  };

  async componentDidMount() {
    //const recipeTitle = this.props.location.recipe;

    const apiResponse = await axios.get(
      `https://api.spoonacular.com/recipes/1003464/ingredientWidget.json?apiKey=${API_KEY}`
    );

    const recipeIngredients = await apiResponse.data.ingredients;
    this.setState({ currentRecipe: recipeIngredients });
    console.log("state:", this.state.currentRecipe[0]);
  }

  render() {
    const { recipe } = this.props.location.state;
    const ingredients = this.state.currentRecipe;
    console.log("ing:", ingredients[0]);
    return (
      <div className="container">
        {ingredients.length !== 0 ? (
          <div className="active-recipe">
            <img
              className="active-recipe__img"
              src={recipe.recipe_image}
              alt={recipe.recipe_title}
            />
            <h3 className="active-recipe__title">{recipe.recipe_title}</h3>
            {ingredients.map((ingredient) => (
              <h3 key={ingredient.name} className="active-recipe__publisher">
                &#8210; {ingredient.name}:&nbsp;
                <span>
                  {ingredient.amount.metric.value}
                  {ingredient.amount.metric.unit}
                </span>
              </h3>
            ))}
            <button className="active-recipe__button">
              <Link to="/">Go Home</Link>
            </button>
          </div>
        ) : (
          "SEARCHING RECIPE INGREDIENTS"
        )}
      </div>
    );
  }
}

export default Recipe;
