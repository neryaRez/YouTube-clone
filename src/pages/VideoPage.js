// src/pages/VideoPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { useVideos } from "../context/VideoContext";
import './VideoPage.css'


export default function VideoPage() {
  const { id } = useParams();
  const { videos } = useVideos();

  // עדיין לא נטענו הסרטונים
  if (videos.length === 0) {
    return <div style={{ padding: "2rem" }}>⏳ טוען...</div>;
  }

  const video = videos.find(v => v.id === id); // <-- שים לב פה לתיקון

  if (!video) {
    return <div style={{ padding: "2rem" }}>❌ סרטון לא נמצא</div>;
  }

  return (
    <div className="video-page">
      <h2>{video.title}</h2>
      <div className="video-container">
        <iframe
          src={video.videoUrl}
          title={video.title}
          allowFullScreen
        />
      </div>
      <p className="views">{video.views} צפיות</p>
    </div>
  );
}
