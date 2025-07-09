// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, setSearchTerm } = useVideos();

  const handleSignIn = () => {
    if (currentUser) {
      navigate('/profile');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    navigate('/');
  };

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

      {currentUser ? (
        <>
          <Link to="/profile" className="button-link">my profile</Link>
          <button onClick={handleLogout} className="button-link">log out</button>
        </>
      ) : (
        <>
          <button onClick={handleSignIn} className="button-link">sign in</button>
          <Link to="/register" className="button-link">sign up</Link>
        </>
      )}
    </header>
  );
};

export default Header;
