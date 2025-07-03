// Home.js
import { useVideos } from '../context/VideoContext';
import VideoCard from '../components/VideoCard';

export default function Home() {
  const { videos } = useVideos();

  return (
    <div>
      <h1>סרטונים מומלצים</h1>
      <div className="video-list">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
