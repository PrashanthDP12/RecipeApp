import React, { useState } from 'react';
import { apiClient } from './api/apiClient';
import '../styles/AddRecipe.css';
import useInput from '../hooks/use-input';

function AddRecipe() {
  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitle
  } = useInput(value => value.trim() !== '');

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescription
  } = useInput(value => value.trim() !== '');

  const {
    value: cookingTime,
    isValid: cookingTimeIsValid,
    hasError: cookingTimeHasError,
    valueChangeHandler: cookingTimeChangeHandler,
    inputBlurHandler: cookingTimeBlurHandler,
    reset: resetCookingTime
  } = useInput(value => value.trim() !== '');
  

  const {
    value: ingredients,
    isValid: ingredientsIsValid,
    hasError: ingredientsHasError,
    valueChangeHandler: ingredientsChangeHandler,
    inputBlurHandler: ingredientsBlurHandler,
    reset: resetIngredients
  } = useInput(value => value.trim() !== '');
  
  const {
    value: method,
    isValid: methodIsValid,
    hasError: methodHasError,
    valueChangeHandler: methodChangeHandler,
    inputBlurHandler: methodBlurHandler,
    reset: resetMethod
  } = useInput(value => value.trim() !== '');

  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

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
      resetTitle();
      resetDescription();
      resetCookingTime();
      resetIngredients();
      resetMethod();
      // Reset other fields...
    } catch (error) {
      console.error('Error adding recipe:', error);
    }
  };

  const formIsValid = titleIsValid && descriptionIsValid && cookingTimeIsValid && ingredientsIsValid && methodIsValid/* Other field validations... */;

  return (
    <div className="fade-in-component">
      <div className="add-recipe-container">
        <h2 className="add-recipe-title">Add New Recipe</h2>
        {successMessage && <p className="text-success">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className={`mb-3 ${titleHasError ? 'invalid' : ''}`}>
            <label htmlFor="title" className="form-label">Title :</label>
            <input
              type="text"
              className={`form-control ${titleHasError ? 'invalid' : ''}`}
              id="title"
              value={title}
              onChange={titleChangeHandler}
              onBlur={titleBlurHandler}
              required
            />
            {titleHasError && <p className="error-text">Please enter a valid title.</p>}
          </div>
          <div className={`mb-3 ${descriptionHasError ? 'invalid' : ''}`}>
            <label htmlFor="description" className="form-label">Description :</label>
            <input
              type="text"
              className={`form-control ${descriptionHasError ? 'invalid' : ''}`}
              id="description"
              value={description}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              required
            />
            {descriptionHasError && <p className="error-text">Please enter a valid description.</p>}
          </div>
          <div className={`mb-3 ${cookingTimeHasError ? 'invalid' : ''}`}>
            <label htmlFor="cookingTime" className="form-label">Cooking Time :</label>
            <input
              type="text"
              className={`form-control ${cookingTimeHasError ? 'invalid' : ''}`}
              id="cookingTime"
              value={cookingTime}
              onChange={cookingTimeChangeHandler}
              onBlur={cookingTimeBlurHandler}
              required
            />
            {cookingTimeHasError && <p className="error-text">Please enter a valid cooking time.</p>}
          </div>
          <div className={`mb-3 ${ingredientsHasError ? 'invalid' : ''}`}>
            <label htmlFor="ingredients" className="form-label">Ingredients :</label>
            <input
              type="text"
              className={`form-control ${ingredientsHasError ? 'invalid' : ''}`}
              id="cookingTime"
              value={ingredients}
              onChange={ingredientsChangeHandler}
              onBlur={ingredientsBlurHandler}
              required
            />
            {ingredientsHasError && <p className="error-text">Please enter a valid ingredients.</p>}
          </div>
          <div className={`mb-3 ${methodHasError ? 'invalid' : ''}`}>
            <label htmlFor="ingredients" className="form-label">Method :</label>
            <input
              type="text"
              className={`form-control ${methodHasError ? 'invalid' : ''}`}
              id="cookingTime"
              value={method}
              onChange={methodChangeHandler}
              onBlur={methodBlurHandler}
              required
            />
            {methodHasError && <p className="error-text">Please enter a valid method.</p>}
          </div>
          <button type="submit" className="btn btn-primary add-recipe-button">Add Recipe</button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;

