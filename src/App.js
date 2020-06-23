// Third
import React, { Component } from "react";
import axios from "axios";

// Local
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import "./App.css";

// Initializations
const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

class App extends Component {
  state = {
    recipes: [],
  };

  async componentDidMount() {
    const previousRecipes = localStorage.getItem("recipes");

    if (previousRecipes) {
      const recipes = JSON.parse(previousRecipes);
      return this.setState({ recipes });
    }

    const apiResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`
    );

    const recipes = await apiResponse.data.results;
    return this.setState({ recipes });
  }

  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();

    const apiResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&instructionsRequired=true&includeRecipes&query=${recipeName}`
    );

    const recipes = await apiResponse.data.results;
    this.setState({ recipes });
    console.log(this.state.recipes);
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe} />
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;
