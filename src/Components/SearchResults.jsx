import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function SearchResults({ results }) {
  return (
    <div style={{ backgroundColor: '#89CFF0' }}>
      <h2>Search Results:</h2>
      <div className="card-columns">
        {results.map((recipe) => (
          <div className="card" key={recipe.id}>
            <div className="card-body">
              <h5 className="card-title font-weight-bold">
                {recipe.title}
                {recipe.favorite && <FaStar style={{ color: 'gold' }} />}
              </h5>
              <p className="card-text">{recipe.description}</p>
              <Link to={`/display-recipes/${recipe.recipeKey}`} className="btn btn-primary">
                View Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
