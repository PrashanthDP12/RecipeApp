import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './displayRecipes.css';

const API_BASE_URL = 'http://localhost:8080/recipes/v2';

function DisplayRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="display-recipes-container">
      <h2 className="text-center mb-4">All Recipes</h2>
      <div className="card-columns">
        {recipes.map((recipe) => {
          // console.log(recipe);
          return (
            <div className="card" key={recipe.id}>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <Link to={`/display-recipes/${recipe.recipeKey}`} className="btn btn-primary">View Recipe</Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DisplayRecipes;



