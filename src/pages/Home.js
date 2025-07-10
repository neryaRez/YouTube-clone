// File: src/pages/Home.js
import React from "react";
import { useVideos } from "../context/VideoContext";
import VideoCard from "../components/VideoCard"; // ✅ שימוש בקומפוננטה
import "./HomePage.css";

export default function HomePage() {
  const { videos, searchTerm } = useVideos();

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {filteredVideos.map((video) => (
        <VideoCard key={video._id} video={video} />

      ))}
    </div>
  );
}
