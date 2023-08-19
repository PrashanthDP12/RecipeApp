import React, { useState } from "react";
import { apiClient } from "./api/apiClient";
import SearchResults from "./SearchResults";
import useInput from "../hooks/use-input"; 
import "../styles/SearchRecipes.css";

function SearchRecipes() {
  const {
    value: keyword,
    isValid: keywordIsValid,
    hasError: keywordHasError,
    valueChangeHandler: keywordChangeHandler,
    inputBlurHandler: keywordBlurHandler,
    reset: resetKeyword,
  } = useInput((value) => value.trim() !== ""); 

  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!keywordIsValid) {
      return;
    }

    try {
      const response = await apiClient.get(`/search?keyword=${keyword}`);
      setSearchResults(response.data.content);
    } catch (error) {
      console.error("Error searching recipes:", error);
    }
  };

  return (
    <div className="fade-in-component">
      <div className="search-recipes-container">
        <h2 className="search-recipes-title">Search Recipes</h2>
        <form onSubmit={handleSearch} className="search-form">
          <div className={`input-group ${keywordHasError ? "invalid" : ""}`}>
          
            <input
              type="text"
              className={`form-control ${keywordHasError ? "invalid" : ""}`} 
              placeholder="Enter keyword"
              value={keyword}
              onChange={keywordChangeHandler}
              onBlur={keywordBlurHandler} 
              style={{ borderRadius: '30px' }}
            />
          
            <div >
              <button type="submit" className="btn btn-primary custom-button">
                Search
              </button>
            </div>
          </div>
          {keywordHasError && <p className="error-text">Please enter a valid keyword.</p>}
        </form>

        {searchResults.length > 0 ? (
          <SearchResults results={searchResults} />
        ) : (
          <p className="no-results">No search results found.</p>
        )}
      </div>
    </div>
  );
}

export default SearchRecipes;
