import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HeaderComponent.css';

function HeaderComponent() {
  return (
    <header className="app-header">
      <Link to="/" className="app-title">Tasty Temptations</Link> {/* Home link */}
    </header>
  );
}

export default HeaderComponent;
