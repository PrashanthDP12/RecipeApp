import React from "react";
import { Routes, Route } from "react-router-dom";
import DisplayRecipes from "./Components/DisplayRecipes";
import SearchRecipes from "./Components/SearchRecipes";
import Home from "./Components/Home";
import RecipeDetails from "./Components/RecipeDetails";
import FavoriteRecipes from "./Components/FavoriteRecipes";
import AddRecipe from "./Components/AddRecipe";
import HeaderComponent from "./Components/HeaderComponent";
import RecipeUpdate from "./Components/RecipeUpdate";
import './RecipeApp.css';

function RecipeApp() {
  return (
    <div className="app-container">
      <HeaderComponent /> 
      <div className="container-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/display-recipes" element={<DisplayRecipes />} />
          <Route path="/search-recipes" element={<SearchRecipes />} />
          <Route path="/display-recipes/:id" element={<RecipeDetails />} />
          <Route path="/favorite-recipes" element={<FavoriteRecipes />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/update-recipe/:id" element={<RecipeUpdate />} />
        </Routes>
      </div>
    </div>
  );
}

export default RecipeApp;
