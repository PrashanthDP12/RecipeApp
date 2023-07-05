import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RecipeDetails.css';

const API_BASE_URL = 'http://localhost:8080/recipes/v2';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{recipe.title}</h2>
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
      <h4 className="recipe-reviews">Reviews:</h4>
      <div className="review-table-container">
        <table className="review-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Comment</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {recipe.reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.userId}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipeDetails;
