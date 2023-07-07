import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from './api/apiClient';

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
    <div style={{ backgroundColor: '#89CFF0' }}>
      <h2 className="text-center mb-4">Favorite Recipes</h2>
      <div className="card-columns">
        {favoriteRecipes.map((recipe) => (
          <div className="card" key={recipe.id}>
            <div className="card-body">
              <h5 className="card-title font-weight-bold">{recipe.title}</h5>
              <p className="card-text">{recipe.description}</p>
              <Link to={`/display-recipes/${recipe.recipeKey}`} className="btn btn-primary">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
