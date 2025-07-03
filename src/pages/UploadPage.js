// src/pages/UploadPage.js
import './UploadPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const { addVideo } = useVideos();
  const navigate = useNavigate();

  function getThumbnailFromUrl(url) {
    const match = url.match(/embed\/(.+?)$/);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : '';
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVideo = {
      title,
      videoUrl,
      thumbnail: getThumbnailFromUrl(videoUrl),
      views: 0
    };

    addVideo(newVideo);
    navigate('/');
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
          placeholder="YouTube Embed URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <button type="submit">הוסף 🎬</button>
      </form>
    </div>
  );
}
