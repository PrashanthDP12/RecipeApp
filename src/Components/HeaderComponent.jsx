import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderComponent.css';

function HeaderComponent() {
  return (
    <header className="app-header">
      <Link to="/" className="app-title">Tasty Temptations</Link> 
    </header>
  );
}

export default HeaderComponent;
