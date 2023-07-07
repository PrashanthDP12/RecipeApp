import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center" style={{ backgroundColor: '#f8f9fa', padding: '2rem', height: '100vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '2rem', color: '#ff4081' }}>
        Welcome to Recipe App
      </h1>
      <div className="mt-5">
        <Link
          to="/display-recipes"
          className="btn btn-primary btn-lg mx-2"
          style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
        >
          Display All Recipes
        </Link>
        <Link
          to="/search-recipes"
          className="btn btn-primary btn-lg mx-2"
          style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
        >
          Search Recipes
        </Link>
        <Link
          to="/favorite-recipes"
          className="btn btn-primary btn-lg mx-2"
          style={{ backgroundColor: '#007bff', borderColor: '#007bff' }}
        >
          Favorite Recipes
        </Link>
      </div>
    </div>
  );
}

export default Home;

