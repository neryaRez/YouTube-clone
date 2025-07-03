// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <Link to="/">YouTube Clone</Link>
      </div>
      <input type="text" placeholder="חפש סרטונים..." />
      <Link to="/profile" className='button-link'>my profile</Link>
      </header>
  );
};

export default Header;
// This is a simple header component for a YouTube clone application.
// It includes a logo that links to the home page, a search input, and a login button that links to the login page.
// The component uses React Router's Link component for navigation.
// The header is styled with basic CSS, and you can expand it with more features like user profile, notifications, etc.
