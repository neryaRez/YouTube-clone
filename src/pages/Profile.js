import './Profile.css';
import { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { useNavigate } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';

export default function Profile() {
  const [videos, setVideos] = useState([]);
  const { searchTerm } = useVideos();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyVideos = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      try {
        const res = await fetch(`http://localhost:5000/users/${userId}/videos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setVideos(data);
        } else {
          console.error('⚠️ שגיאה:', data.message);
        }
      } catch (err) {
        console.error("⚠️ שגיאה בטעינת סרטוני המשתמש:", err);
      }
    };

    fetchMyVideos();
  }, []);

  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        {filteredVideos.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </div>
  );
}
