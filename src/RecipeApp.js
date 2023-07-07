import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayRecipes from './Components/DisplayRecipes';
import SearchRecipes from './Components/SearchRecipes';
import Home from './Components/Home';
import RecipeDetails from './Components/RecipeDetails';
import FavoriteRecipes from './Components/FavoriteRecipes';

function RecipeApp() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/display-recipes" element={<DisplayRecipes />} />
        <Route path="/search-recipes" element={<SearchRecipes />} />
        <Route path="/display-recipes/:id" element={<RecipeDetails />} />
        <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
      </Routes>
    </div>
  );
}

export default RecipeApp;
