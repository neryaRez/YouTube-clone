import './UploadPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔎 הפקת ID מהקישור מכל סוג
  function extractVideoId(url) {
    const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\?&]+)/;
    const match = url.match(regex);
    return match ? match[1] : '';
  }

  // 🖼️ הפקת thumbnail
  function getThumbnailFromUrl(url) {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : '';
  }

  // ▶️ המרת הקישור ל־embed
  function getEmbedUrl(url) {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('⏳ מעלה את הסרטון...');

    const token = localStorage.getItem('token');

    const newVideo = {
      title,
      videoUrl: getEmbedUrl(videoUrl),
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
        setMessage('✅ סרטון הועלה בהצלחה!');
        setTimeout(() => navigate('/'), 1000);
      } else {
        setMessage(data.message || '❌ שגיאה בהעלאה');
      }
    } catch (err) {
      setMessage('🚨 שגיאה בשרת');
    } finally {
      setLoading(false);
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
          placeholder="קישור ל־YouTube (כל סוג נתמך)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? '⏳ מעלה...' : 'הוסף 🎬'}
        </button>
        {loading && <div className="spinner"></div>}
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}
