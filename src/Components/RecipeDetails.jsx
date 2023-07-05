import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";

const API_BASE_URL = "http://localhost:8080/recipes/v2";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newUserId, setNewUserId] = useState('');
  const [ratingError, setRatingError] = useState(false);

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const addReview = async () => {
    try {
      const review = {
        comment: newReview,
        rating: newRating,
        userId: newUserId
      };

      if (isNaN(newRating) || newRating < 1 || newRating > 5) {
        setRatingError(true);
        return;
      }
  
      const response = await axios.post(`${API_BASE_URL}/${id}/reviews`, review);
      const addedReview = response.data;
  
      // Update the recipe with the new review
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        reviews: [...prevRecipe.reviews, addedReview]
      }));
  
      // Clear the review input fields
      setNewReview('');
      setNewRating('');
      setNewUserId("");
      setRatingError(false);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  const clearFields = () => {
    setNewReview("");
    setNewRating("");
    setNewUserId("");
    setRatingError(false);
  };
  

  // Update an existing review
  const updateReview = async (reviewId, updatedReview) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${id}/reviews/${reviewId}`,
        updatedReview
      );
      const updated = response.data;

      // Update the recipe with the updated review
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.map((review) =>
          review.id === updated.id ? updated : review
        ),
      }));
    } catch (error) {
      console.error("Error updating review:", error);
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

      <div className="add-review-container">
        <h4>Add Review:</h4>
        <div className="input-fields">
          <div className="input-field">
            <label>User ID:</label>
            <input
              type="text"
              value={newUserId}
              onChange={(event) => setNewUserId(event.target.value)}
              placeholder="Enter your user ID"
            />
          </div>
          <div className="input-field">
            <label>Review:</label>
            <textarea
              value={newReview}
              onChange={(event) => setNewReview(event.target.value)}
              placeholder="Enter your review"
            />
          </div>
          <div className="input-field">
            <label>Rating:</label>
            <input
              type="number"
              min="1"
              max="5"
              value={newRating}
              onChange={(event) => setNewRating(event.target.value)}
              placeholder="Enter rating (1-5)"
            />
            {ratingError && <p className="error-message">Invalid rating entered.</p>}
          </div>
        </div>
        <div className="button-container">
          <button onClick={addReview}>Add Review</button>
          <button onClick={clearFields}>Clear</button>
        </div>
      </div>

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
