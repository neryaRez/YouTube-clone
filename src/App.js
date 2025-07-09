// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import VideoPage from './pages/VideoPage';
import { VideoProvider } from './context/VideoContext';
import UploadPage from './pages/UploadPage';
import LoginPage from './pages/LogIn';
import ProtectedRoute from './components/ProtectedRoute'; // 👈 חדש
import RegisterPage from './pages/RegisterPage';
import './App.css';

const App = () => {
  return (
    <VideoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* 🛡️ דפים שמוגנים */}
          <Route path="/upload" element={
            <ProtectedRoute><UploadPage /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
        </Routes>
      </Router>
    </VideoProvider>
  );
};

export default App;
