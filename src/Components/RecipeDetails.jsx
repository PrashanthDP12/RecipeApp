import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetails.css";
import { apiClient } from "./api/apiClient";
import ReviewForm from "./ReviewForm";
import ReviewTable from "./ReviewTable";
import RecipeInfo from "./RecipeInfo";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      fetchRecipe();
    }
  }, [recipe]);

  const fetchRecipe = async () => {
    try {
      const response = await apiClient.get(`/${id}`);
      setRecipe(response.data);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    }
  };

  const addReview = async (review) => {
    try {
      const response = await apiClient.post(`/${id}/reviews`, review);
      const addedReview = response.data;

      // Update the recipe with the new review
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: [...prevRecipe.reviews, addedReview],
      }));
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const updateReview = async (reviewId, updatedReview) => {
    try {
      const response = await apiClient.put(`/${id}/reviews/${reviewId}`, updatedReview);
      const updated = response.data;

      // Update the recipe with the updated review
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.map((review) => (review.id === updated.id ? updated : review)),
      }));
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await apiClient.delete(`/${id}/reviews/${reviewId}`);
  
      // Remove the deleted review from the recipe's reviews
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.filter((review) => review.userId !== reviewId),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">{recipe.title}</h2>
      <RecipeInfo recipe={recipe} />

      <h4 className="recipe-reviews">Reviews:</h4>

      <ReviewForm onAddReview={addReview} />

      <ReviewTable reviews={recipe.reviews} onUpdateReview={updateReview} onDeleteReview={deleteReview} />
    </div>
  );
}

export default RecipeDetails;
