import React, { useState } from 'react';
import { apiClient } from './api/apiClient';

function AddRecipe() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cookingTime, setCookingTime] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [method, setMethod] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      description,
      cookingTime,
      ingredients,
      method
    };

    try {
      const response = await apiClient.post('', newRecipe);
      console.log('New recipe added:', response.data);
      setSuccessMessage('Recipe added successfully!');
      // Reset form fields
      setTitle('');
      setDescription('');
      setCookingTime(0);
      setIngredients('');
      setMethod('');
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  return (
    <div>
      <h2>Add New Recipe</h2>
      {successMessage && <p className="text-success">{successMessage}</p>}
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
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
