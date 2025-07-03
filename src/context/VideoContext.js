// src/context/VideoContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const VideoContext = createContext();
export const useVideos = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  // שליפת סרטונים מהשרת כשנטען
  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then(res => res.json())
      .then(data => {
        const withId = data.map(v => ({
          id: v._id,
          title: v.title,
          views: v.views,
          thumbnail: v.thumbnail,
          videoUrl: v.videoUrl
        }))
        setVideos(withId);
      })
      .catch(err => console.error("בעיה בשליפת הסרטונים:", err));
  }, []);

  // שליחת סרטון חדש לשרת
  const addVideo = (video) => {
    fetch('http://localhost:5000/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(video)
    })
      .then(res => res.json())
      .then(newVideo => setVideos(prev => [...prev, newVideo]))
      .catch(err => console.error("בעיה בהוספת הסרטון:", err));
  };

  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/videos/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => setVideos(prev => prev.filter(v => v.id !== id)))
      .catch(err => console.error("בעיה במחיקת הסרטון:", err));
  };
  

  return (
    <VideoContext.Provider value={{ videos, addVideo, deleteVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
export default VideoProvider;