// Profile.js
import { useVideos } from '../context/VideoContext';
import AddVideo from '../components/AddVideo';
import VideoCard from '../components/VideoCard';

export default function Profile() {
  const { videos, addVideo } = useVideos();

  return (
    <div style={{ padding: '20px' }}>
      <h2>הסרטונים שלי</h2>
      <AddVideo onAdd={addVideo} />
      <div className="video-list">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
// This component allows users to view and add their own videos.