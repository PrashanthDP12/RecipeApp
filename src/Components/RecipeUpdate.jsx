import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiClient } from './api/apiClient';

function RecipeUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    try {
      const response = await apiClient.get(`/${id}`);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setCookingTime(response.data.cookingTime);
      setIngredients(response.data.ingredients);
      setMethod(response.data.method);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRecipe = {
      title,
      description,
      cookingTime,
      ingredients,
      method
    };

    try {
      const response = await apiClient.put(`/${id}`, updatedRecipe);
      console.log('Recipe updated:', response.data);
      navigate(`/display-recipes/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cookingTime" className="form-label">
            Cooking Time (minutes):
          </label>
          <input
            type="number"
            className="form-control"
            id="cookingTime"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ingredients" className="form-label">
            Ingredients:
          </label>
          <textarea
            className="form-control"
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="method" className="form-label">
            Method:
          </label>
          <textarea
            className="form-control"
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Update Recipe
        </button>
      </form>
    </div>
  );
}

export default RecipeUpdate;
