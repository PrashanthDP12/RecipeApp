import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
import { apiClient } from './api/apiClient'

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const [updatedReview, setUpdatedReview] = useState({
    comment: "",
    rating: "",
    reviewId: null,
  });

  const [selectedReview, setSelectedReview] = useState(null);

  const handleUpdateReview = (review) => {
    setSelectedReview(review);
    setUpdatedReview({
      comment: review.comment,
      rating: review.rating,
      reviewId: review.id,
    });
  };

  const handleCancelUpdate = () => {
    setSelectedReview(null);
    setUpdatedReview({ comment: "", rating: "" });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (updatedReview) {
      fetchRecipe();
    }
  }, [updatedReview]);

  const fetchRecipe = async () => {
    try {
      const response = await apiClient.get(`/${id}`);
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
        userId: newUserId,
      };

      if (isNaN(newRating) || newRating < 1 || newRating > 5) {
        setRatingError(true);
        return;
      }

      const response = await apiClient.post(
        `/${id}/reviews`,
        review
      );
      const addedReview = response.data;

      // Update the recipe with the new review
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: [...prevRecipe.reviews, addedReview],
      }));

      // Clear the review input fields
      setNewReview("");
      setNewRating("");
      setNewUserId("");
      setRatingError(false);
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const clearFields = () => {
    setNewReview("");
    setNewRating("");
    setNewUserId("");
    setRatingError(false);
  };

  const updateReview = async (reviewId) => {
    try {
      const updatedReviewWithUserId = { ...updatedReview, reviewId };

      const response = await apiClient.put(
        `/${id}/reviews/${reviewId}`,
        updatedReviewWithUserId
      );
      const updated = response.data;

      // Update the recipe with the updated review
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.map((review) =>
          review.id === updated.id ? updated : review
        ),
      }));

      // Clear the updatedReview state and input fields
      setUpdatedReview({
        comment: "",
        rating: "",
        reviewId: null,
      });
      // Reset the selectedReview state
      setSelectedReview(null);
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
            {ratingError && (
              <p className="error-message">Invalid rating entered.</p>
            )}
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {recipe.reviews.map((review, index) => (
              <tr key={index}>
                <td>{review.userId}</td>
                <td>{review.comment}</td>
                <td>{review.rating}</td>
                <td>
                  {selectedReview && selectedReview.userId === review.userId ? (
                    <>
                      <input
                        type="text"
                        name="comment"
                        value={updatedReview.comment}
                        onChange={handleInputChange}
                      />
                      <input
                        type="text"
                        name="rating"
                        value={updatedReview.rating}
                        onChange={handleInputChange}
                      />
                      <button onClick={() => updateReview(review.userId)}>
                        Save
                      </button>
                      <button onClick={handleCancelUpdate}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleUpdateReview(review)}>
                        Update
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecipeDetails;
