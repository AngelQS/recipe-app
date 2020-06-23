import React from "react";
import { Link } from "react-router-dom";

const Recipes = ({ recipes }) => {
  return (
    <div className="container">
      <div className="row">
        {recipes.map((recipe) => {
          return (
            <div
              key={recipe.id}
              className="col-md-4"
              style={{ marginBottom: "2rem" }}
            >
              <div className="recipes__box">
                <img
                  className="recipe__box-img"
                  src={recipe.image}
                  alt={recipe.title}
                />
                <div className="recipe__text">
                  <h5 className="recipes__title">
                    {recipe.title.length < 20
                      ? recipe.title
                      : `${recipe.title.substring(0, 25)}...`}
                  </h5>
                </div>
                <button className="recipe_buttons">
                  <Link
                    to={{
                      pathname: `/recipe/${recipe.id}`,
                      state: {
                        recipe: {
                          recipe_title: recipe.title,
                          recipe_image: recipe.image,
                        },
                      },
                    }}
                  >
                    View Recipe
                  </Link>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Recipes;
