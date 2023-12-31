import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "./api/apiClient";
import ReviewForm from "./ReviewForm";
import ReviewTable from "./ReviewTable";
import RecipeInfo from "./RecipeInfo";
import { FaStar } from "react-icons/fa";
import "../styles/RecipeDetails.css";
import Card from "../Components/UI/Card";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const navigate = useNavigate();
  const [showAddReview, setShowAddReview] = useState(false); 

  const handleAddReviewClick = () => {
    setShowAddReview((prevState) => !prevState);
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      fetchRecipe();
      setIsFavorite(recipe.favorite);
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
      setShowAddReview(false);
      const response = await apiClient.post(`/${id}/reviews`, review);
      const addedReview = response.data;

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
      const response = await apiClient.put(
        `/${id}/reviews/${reviewId}`,
        updatedReview
      );
      const updated = response.data;

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

  const deleteReview = async (reviewId) => {
    try {
      await apiClient.delete(`/${id}/reviews/${reviewId}`);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        reviews: prevRecipe.reviews.filter(
          (review) => review.userId !== reviewId
        ),
      }));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await apiClient.delete(`/${id}/favorite`);
      } else {
        await apiClient.post(`/${id}/favorite`);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleUpdateClick = () => {
    navigate(`/update-recipe/${id}`);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe-details-container">
      <h2 className="recipe-title">
        {recipe.title}
        {recipe.favorite !== null && (
          <FaStar
            className={isFavorite ? "favorite-icon active" : "favorite-icon"}
            onClick={toggleFavorite}
          />
        )}
      </h2>     
      <RecipeInfo recipe={recipe} />
      <div className="button-container">
        <button type="button" onClick={handleUpdateClick}>
          Update Recipe
        </button>
        <button type="button" onClick={handleAddReviewClick}>
          {showAddReview ? "Hide Review":"Add Review"}
        </button>
      </div>
      {showAddReview && ( 
        <Card>
          <ReviewForm onAddReview={addReview} />
        </Card>
      )}
      <Card>
      <ReviewTable
        reviews={recipe.reviews}
        onUpdateReview={updateReview}
        onDeleteReview={deleteReview}
      />
      </Card>
    </div>
  );
}

export default RecipeDetails;
