import React, { useState , useCallback } from "react";

function ReviewTable({ reviews, onUpdateReview, onDeleteReview }) {
  const [updatedReview, setUpdatedReview] = useState({
    comment: "",
    rating: "",
    reviewId: null,
  });

  const [selectedReview, setSelectedReview] = useState(null);

  const handleEditReview = useCallback((review) => {
    setSelectedReview(review);
    setUpdatedReview({
      comment: review.comment,
      rating: review.rating,
      reviewId: review.id,
    });
  },[]);

  const handleCancelUpdate = useCallback(() => {
    setSelectedReview(null);
    setUpdatedReview({ comment: "", rating: "" });
  },[]);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setUpdatedReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  },[]);

  const updateReview = useCallback((reviewId) => {
    const updatedReviewWithUserId = { ...updatedReview, reviewId };

    onUpdateReview(reviewId, updatedReviewWithUserId);
    setUpdatedReview({
      comment: "",
      rating: "",
      reviewId: null,
    });

    setSelectedReview(null);
  },[onUpdateReview]);

  const deleteReview = useCallback((reviewId) => {
    onDeleteReview(reviewId);
  },[onDeleteReview]);

  return (
    <div className="review-table-container">
      <table className="review-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Comment</th>
            <th>Rating</th>
            <th style={{ textAlign: "center" }}>Action</th>
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
                    <div className="button-container">
                      <button onClick={() => updateReview(review.userId)}>
                        Save
                      </button>
                      <button onClick={handleCancelUpdate}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="button-container">
                      <button onClick={() => handleEditReview(review)}>
                        Edit
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

export default React.memo(ReviewTable);
