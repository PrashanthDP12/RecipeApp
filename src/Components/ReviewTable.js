import React, { useState } from "react";

function ReviewTable({ reviews, onUpdateReview, onDeleteReview }) {
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

  const updateReview = (reviewId) => {
    const updatedReviewWithUserId = { ...updatedReview, reviewId };

    onUpdateReview(reviewId, updatedReviewWithUserId);

    // Clear the updatedReview state
    setUpdatedReview({
      comment: "",
      rating: "",
      reviewId: null,
    });

    // Reset the selectedReview state
    setSelectedReview(null);
  };

  const deleteReview = (reviewId) => {
    onDeleteReview(reviewId);
  };

  return (
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
          {reviews.map((review, index) => (
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
                    <div className="button-container">
                      <button onClick={() => handleUpdateReview(review)}>
                        Update
                      </button>
                      <button onClick={() => deleteReview(review.userId)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewTable;
