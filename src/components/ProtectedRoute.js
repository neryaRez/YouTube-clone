// src/components/ProtectedRoute.js
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useVideos();

  useEffect(() => {
    if (!currentUser) {
      alert("🔒 עליך להתחבר תחילה");
    }
  }, [currentUser]); // ✅ ירוץ רק כש currentUser משתנה

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return children;
}
