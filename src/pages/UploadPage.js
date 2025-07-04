// src/pages/UploadPage.js
import './UploadPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  function getThumbnailFromUrl(url) {
    const match = url.match(/embed\/(.+?)$/);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const newVideo = {
      title,
      videoUrl,
      thumbnail: getThumbnailFromUrl(videoUrl),
      description,
    };

    try {
      const res = await fetch('http://localhost:5000/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newVideo),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ סרטון הועלה בהצלחה');
        navigate('/');
      } else {
        setMessage(data.message || 'שגיאה בהעלאה');
      }
    } catch (err) {
      setMessage('🚨 שגיאה בשרת');
    }
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">🎥 הוסף סרטון חדש</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="כותרת"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="תיאור"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="YouTube Embed URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button type="submit">הוסף 🎬</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
