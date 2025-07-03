// Profile.js
import { useVideos } from '../context/VideoContext';
import VideoCard from '../components/VideoCard';
import UploadPage from './UploadPage';
export default function Profile() {
  const { videos, addVideo } = useVideos();

  return (
    <div style={{ padding: '20px' ,alignItems: 'center', backgroundColor: '#2e003e', minHeight: '100vh', color: '#fff' ,
    display: 'flex', flexDirection: 'column', gap: '20px' }}>
    
      <h2>הסרטונים שלי</h2>
      <p>כאן תוכל לראות את הסרטונים שהעלית</p>
      <UploadPage UploadPage={UploadPage} addVideo={addVideo} />
      <div className="video-list">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
// This component allows users to view and add their own videos.