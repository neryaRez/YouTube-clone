import React from "react";
import { useVideos } from "../context/VideoContext";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const { videos, searchTerm } = useVideos();

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">
      {filteredVideos.map((video) => (
        <Link to={`/video/${video.id}`} key={video.id} className="video-card">
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-info">
            <h3>{video.title}</h3>
            <p>{video.views} צפיות</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
