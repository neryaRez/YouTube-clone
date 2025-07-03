// src/components/VideoCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ title, views, thumbnail, id }) => {
  return (
    <Link to={`/video/${id}`}>
      <div className="video-card">
        <img src={thumbnail} alt={title} />
        <div className="video-info">
          <h3>{title}</h3>
          <p>{views} צפיות</p>
        </div>
      </div>
    </Link>
  );
};


export default VideoCard;
