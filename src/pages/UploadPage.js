// src/pages/UploadPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [views, setViews] = useState(0);
  const { addVideo } = useVideos();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVideo = {
      title,
      videoUrl,
      thumbnail,
      views
    };

    addVideo(newVideo); // זה ישלח לשרת
    navigate('/'); // חזרה לדף הבית
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#2e003e', minHeight: '100vh', color: '#fff' }}>
      <h2 style={{ marginBottom: '24px' }}>🎥 הוסף סרטון חדש</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
        <input type="text" placeholder="כותרת" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="YouTube Embed URL" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required />
        <input type="text" placeholder="Thumbnail URL" value={thumbnail} onChange={e => setThumbnail(e.target.value)} required />
        <input type="number" placeholder="מספר צפיות" value={views} onChange={e => setViews(Number(e.target.value))} />
        <button type="submit" style={{ padding: '12px', background: '#a2469c', color: '#fff', border: 'none', borderRadius: '8px' }}>
          הוסף 🎬
        </button>
      </form>
    </div>
  );
}
