// File: src/components/VideoCard.js

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function VideoCard({ id, title, views, thumbnail, username }) {
  const { deleteVideo } = useVideos();
  const location = useLocation();
  const isProfile = location.pathname === "/profile";

  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleContextMenu = (e) => {
    if (!isProfile) return;
    if (cardRef.current && cardRef.current.contains(e.target)) {
      e.preventDefault();
      setMenuPos({ x: e.clientX, y: e.clientY });
      setMenuVisible(true);
    }
  };

  const handleDelete = () => {
    deleteVideo(id);
    setMenuVisible(false);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    alert("📎 הקישור הועתק");
    setMenuVisible(false);
  };

  return (
    <div
      className="video-card-wrapper"
      ref={cardRef}
      style={{ position: 'relative' }}
      onContextMenu={handleContextMenu}
    >
      <Link to={`/video/${id}`} className="video-card">
        <div className="video-thumbnail-wrapper">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="video-info">
          <h3>{title}</h3>
          <p>{views} צפיות</p>
          <p>הועלה על ידי: <strong>{username || 'אנונימי'}</strong></p>
        </div>
      </Link>

      {menuVisible && (
        <div
          className="video-menu"
          style={{
            position: 'fixed',
            top: menuPos.y,
            left: menuPos.x,
            zIndex: 780,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '10px',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            direction: 'rtl',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            cursor: 'pointer'
          }}
        >
          <button onClick={handleDelete}>🗑️ מחיקת סרטון</button>
          <button onClick={handleShare}>📎 שתף סרטון</button>
        </div>
      )}
    </div>
  );
}
