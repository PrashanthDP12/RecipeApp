import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayRecipes from './Components/DisplayRecipes';
import SearchRecipes from './Components/SearchRecipes';
import Home from './Components/Home';
import RecipeDetails from './Components/RecipeDetails';
import FavoriteRecipes from './Components/FavoriteRecipes';
import AddRecipe from './Components/AddRecipe';


function RecipeApp() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display-recipes" element={<DisplayRecipes />} />
        <Route path="/search-recipes" element={<SearchRecipes />} />
        <Route path="/display-recipes/:id" element={<RecipeDetails />} />
        <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </div>
  );
}

export default RecipeApp;
