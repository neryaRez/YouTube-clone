// src/pages/VideoPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
const mockVideos = [
  {
    id: "1",
    title: "סרטון 1",
    views: "1,000",
    description: "תיאור לסרטון הראשון",
    videoUrl: "https://www.youtube.com/watch?v=_CbbUYjh_Qw&list=RD_CbbUYjh_Qw&start_radio=1"
  },
  {
    id: "2",
    title: "סרטון 2",
    views: "2,000",
    description: "סרטון נוסף על משהו מעניין",
    videoUrl: "https://www.youtube.com/watch?v=hdPnkjjr97s&t=30s"
  },
];

export default function VideoPage() {
  const { id } = useParams();
  const video = mockVideos.find(v => v.id === id);

  if (!video) {
    return <div>לא נמצא סרטון</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{video.title}</h1>
      <ReactPlayer url={video.videoUrl} 
      controls width="100%" 
      height="400px" />
      <p>{video.views} צפיות</p>
      <p>{video.description}</p>
    </div>
  );
}
