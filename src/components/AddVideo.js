// src/components/AddVideo.js
import React, { useState } from 'react';

export default function AddVideo({ onAdd }) {
  const [title, setTitle] = useState("");
  const [views, setViews] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      id: Date.now().toString(),
      title,
      views,
      thumbnail,
    };
    onAdd(newVideo);
    setTitle("");
    setViews("");
    setThumbnail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="כותרת"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="צפיות"
        value={views}
        onChange={(e) => setViews(e.target.value)}
      />
      <input
        type="text"
        placeholder="קישור לתמונה"
        value={thumbnail}
        onChange={(e) => setThumbnail(e.target.value)}
      />
      <button type="submit">הוסף סרטון</button>
    </form>
  );
}
