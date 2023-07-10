import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RecipeApp from './RecipeApp';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Helmet>
          <title>Tasty Temptations</title>
        </Helmet>
        <RecipeApp />
      </div>
    </Router>
  );
}

export default App;
