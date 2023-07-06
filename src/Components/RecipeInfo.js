import React from "react";

function RecipeInfo({ recipe }) {
  return (
    <div className="recipe-card">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Description</h5>
          <hr className="card-line" />
          <p className="card-text">{recipe.description}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Cooking Time</h5>
          <hr className="card-line" />
          <p className="card-text">{recipe.cookingTime} minutes</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Ingredients</h5>
          <hr className="card-line" />
          <p className="card-text">{recipe.ingredients}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Method</h5>
          <hr className="card-line" />
          <p className="card-text">{recipe.method}</p>
        </div>
      </div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Average Rating</h5>
          <hr className="card-line" />
          <p className="card-text">{recipe.averageRating}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeInfo;
