// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import VideoPage from './pages/VideoPage';
import { VideoProvider } from './context/VideoContext';
import UploadPage from './pages/UploadPage';
import './App.css'; // Assuming you have some global styles
const App = () => {
  return (
    <VideoProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </Router>
    </VideoProvider>
  );
};

export default App;
