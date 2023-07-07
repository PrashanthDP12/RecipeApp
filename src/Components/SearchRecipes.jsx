import React, { useState } from 'react';
import { apiClient } from './api/apiClient';
import SearchResults from './SearchResults';
import './SearchRecipes.css';

function SearchRecipes() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.get(`/search?keyword=${keyword}`);
      setSearchResults(response.data.content);
    } catch (error) {
      console.error('Error searching recipes:', error);
    }
  };

  return (
    <div className="search-recipes-container">
      <h2 className="search-recipes-title">Search Recipes</h2>
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {searchResults.length > 0 ? (
        <SearchResults results={searchResults} />
      ) : (
        <p className="no-results">No search results found.</p>
      )}
    </div>
  );
}

export default SearchRecipes;
