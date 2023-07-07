import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './displayRecipes.css';
import { apiClient } from './api/apiClient';
import { FaStar } from 'react-icons/fa';

function DisplayRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await apiClient.get();
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
          return (
            <div className="card" key={recipe.id}>
              <div className="card-body">
                <h5 className="card-title font-weight-bold">
                  {recipe.title}
                  {recipe.favorite && <FaStar style={{ color: 'gold' }} />}
                </h5>
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
