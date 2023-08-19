import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from './api/apiClient';
import '../styles/FavoriteRecipes.css'; // Import the CSS file

function FavoriteRecipes() {
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    fetchFavoriteRecipes();
  }, []);

  const fetchFavoriteRecipes = async () => {
    try {
      const response = await apiClient.get('/favorite');
      setFavoriteRecipes(response.data);
    } catch (error) {
      console.error('Error fetching favorite recipes:', error);
    }
  };

  return (
    <div className="fade-in-component">
    <div className="favorite-recipes-container">
      <h2 className="favorite-recipes-title">Favorite Recipes</h2>
      <div className="card-columns">
        {favoriteRecipes.map((recipe) => (
          <div className="favorite-recipes-card" key={recipe.id}>
            <div className="favorite-recipes-card-body">
              <h5 className="favorite-recipes-card-title">{recipe.title}</h5>
              <p className="favorite-recipes-card-description">{recipe.description}</p>
              <Link to={`/display-recipes/${recipe.recipeKey}`} className="favorite-recipes-card-link">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default FavoriteRecipes;

