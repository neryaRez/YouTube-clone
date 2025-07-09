// src/components/ProtectedRoute.js
import React, { useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function ProtectedRoute({ children }) {
  const { currentUser } = useVideos();
  const alertShown = useRef(false); // 🧠 נעשה מעקב אם כבר ראינו את ה־alert

  useEffect(() => {
    if (!currentUser && !alertShown.current) {
      alert("🔒 עליך להתחבר תחילה");
      alertShown.current = true; // שלא יקרה שוב
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
