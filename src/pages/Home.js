import React from "react";
import { useVideos } from "../context/VideoContext";
import { Link } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const { videos } = useVideos();

  return (
    <div className="home-page">
      {videos.map((video) => (
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
