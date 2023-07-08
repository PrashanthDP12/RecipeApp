import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="text-center home-container" >
      <h1 className="home-title">
        Discover Delicious Recipes
      </h1>
      <p className="home-description">
        Welcome to the Tasty Temptations Recipe App! Explore a wide range of mouth-watering recipes, find your favorites, and add your own creations to share with the community.
      </p>
      <div className="home-buttons">
        <Link
          to="/display-recipes"
          className="home-button"
        >
          Display All Recipes
        </Link>
        <Link
          to="/search-recipes"
          className="home-button"
        >
          Search Recipes
        </Link>
        <Link
          to="/favorite-recipes"
          className="home-button"
        >
          Favorite Recipes
        </Link>
        <Link
          to="/add-recipe"
          className="home-button"
        >
          Add Recipe
        </Link>
      </div>
    </div>
  );
}

export default Home;

