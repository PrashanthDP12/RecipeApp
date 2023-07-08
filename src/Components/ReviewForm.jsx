import React, { useState } from "react";

function ReviewForm({ onAddReview }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");
  const [newUserId, setNewUserId] = useState("");
  const [ratingError, setRatingError] = useState(false);

  const addReview = () => {
    if (isNaN(newRating) || newRating < 1 || newRating > 5) {
      setRatingError(true);
      return;
    }

    const review = {
      comment: newReview,
      rating: newRating,
      userId: newUserId,
    };

    onAddReview(review);

    // Clear the review input fields
    setNewReview("");
    setNewRating("");
    setNewUserId("");
    setRatingError(false);
  };

  const clearFields = () => {
    setNewReview("");
    setNewRating("");
    setNewUserId("");
    setRatingError(false);
  };

  return (
    <div className="add-review-container">
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
  );
}

export default ReviewForm;
