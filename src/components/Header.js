// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

const Header = () => {
  const { setSearchTerm } = useVideos();

  return (
    <header>
      <div className="logo">
        <Link to="/">YouTube Clone</Link>
      </div>
      <input
        type="text"
        placeholder="חפש סרטונים..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Link to="/register" className='button-link'>sign up</Link>
      <Link to="/profile" className='button-link'>sign in</Link>
    </header>
  );
};
export default Header;
