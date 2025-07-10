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
        setVideos(data); // ❗ שומר את המידע כמו שהוא, כולל userId.username אם קיים
      })
      .catch(err => console.error("בעיה בשליפת הסרטונים:", err));

    // שליפת המשתמש המחובר
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
      .then(newVideo => setVideos(prev => [...prev, newVideo])) // ❗ גם כאן שומרים את האובייקט כפי שהוא
      .catch(err => console.error("בעיה בהוספת הסרטון:", err));
  };

  const deleteVideo = (id) => {
    fetch(`http://localhost:5000/videos/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(() => setVideos(prev => prev.filter(v => v._id !== id)))
      .catch(err => console.error("בעיה במחיקת הסרטון:", err));
  };

  const fetchComments = async (videoId) => {
    try {
      const res = await fetch(`http://localhost:5000/comments/${videoId}`);
      return await res.json();
    } catch (err) {
      console.error("בעיה בשליפת תגובות:", err);
      return [];
    }
  };

  const addComment = async (videoId, text) => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:5000/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ videoId, text })
      });

      if (!res.ok) throw new Error("שגיאה בהוספת תגובה");
      return await res.json();
    } catch (err) {
      console.error("שגיאה בהוספת תגובה:", err);
      return null;
    }
  };

  return (
    <VideoContext.Provider value={{
      videos,
      addVideo,
      deleteVideo,
      searchTerm,
      setSearchTerm,
      currentUser,
      setCurrentUser,
      fetchComments,
      addComment
    }}>
      {children}
    </VideoContext.Provider>
  );
};
