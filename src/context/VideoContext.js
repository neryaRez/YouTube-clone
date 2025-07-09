// src/context/VideoContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const VideoContext = createContext();
export const useVideos = () => useContext(VideoContext);

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/videos')
      .then(res => res.json())
      .then(data => {
        const withId = data.map(v => ({
          id: v._id,
          title: v.title,
          views: v.views,
          thumbnail: v.thumbnail,
          videoUrl: v.videoUrl,
          description: v.description,
          username: v.userId?.username // תיקון קטן כאן: userId ולא userID
        }))
        setVideos(withId);
      })
      .catch(err => console.error("בעיה בשליפת הסרטונים:", err));

    // שליפת המשתמש המחובר (אם יש טוקן)
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:5000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(user => {
          setCurrentUser(user);
          console.log("🔑 משתמש מחובר:", user);
        })
        .catch(err => console.error("בעיה בשליפת המשתמש:", err));
    }
  }, []);

  const addVideo = (video) => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(video)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("הוספת הסרטון נכשלה");
        }
        return res.json();
      })
      .then(newVideo => setVideos(prev => [...prev, {
        id: newVideo._id,
        title: newVideo.title,
        views: newVideo.views,
        thumbnail: newVideo.thumbnail,
        videoUrl: newVideo.videoUrl,
        description: newVideo.description
      }]))
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
    <VideoContext.Provider value={{
      videos,
      addVideo,
      deleteVideo,
      searchTerm,
      setSearchTerm,
      currentUser,
      setCurrentUser   // ✅ הוספה חשובה בשביל logout!
    }}>  
      {children}
    </VideoContext.Provider>
  );
};
