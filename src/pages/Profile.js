import './Profile.css';
import { useVideos } from '../context/VideoContext';
import VideoCard from '../components/VideoCard';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const { videos } = useVideos();
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h2 className="profile-title">🎬 הסרטונים שלי</h2>
      <button
        className="upload-button"
        onClick={() => navigate('/upload')}
        title="העלה סרטון חדש"
      >
        +
      </button>
      <p className="profile-subtitle">כאן תוכל לראות את הסרטונים שהעלית</p>
      <div className="video-grid">
        {videos.map((video, index) => (
          <VideoCard key={index} {...video} />
        ))}
      </div>
    </div>
  );
}
