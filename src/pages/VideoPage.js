// src/pages/VideoPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useVideos } from '../context/VideoContext';
import './VideoPage.css';

export default function VideoPage() {
  const { id } = useParams();
  const { videos, fetchComments, addComment, currentUser } = useVideos();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  
  const video = videos.find(v => v.id === id);
  const otherVideos = videos.filter(v => v.id !== id);

  useEffect(() => {
    if (!id) return;

    // עדכון צפיות
    fetch(`http://localhost:5000/videos/${id}/views`, {
      method: 'PATCH'
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("✅ view updated", data.views);
      })
      .catch(err => {
        console.error("בעיה בעדכון צפייה:", err);
      });

    // טעינת תגובות
    const loadComments = async () => {
      const data = await fetchComments(id);
      setComments(data);
    };
    loadComments();
  }, [id, fetchComments]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const saved = await addComment(id, newComment);
    if (saved) {
      setComments(prev => [saved, ...prev]);
      setNewComment('');
    }
  };

  if (!video) {
    return <div style={{ padding: "20px" }}>❌ סרטון לא נמצא</div>;
  }

  return (
    <div className="video-page-container">
      <div className="video-main">
        <iframe
          src={video.videoUrl}
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        <div className="video-title">{video.title}</div>
        <div className="video-views">{video.views} צפיות</div>
        <div className="video-description">
          {video.description || "אין תיאור לסרטון זה."}
        </div>

        {/* 💬 תגובות */}
        <section className="comments-section">
          <h3>💬 תגובות</h3>

          {currentUser ? (
            <form onSubmit={handleCommentSubmit}>
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="כתוב תגובה..."
              />
              <button type="submit">שלח</button>
            </form>
          ) : (
            <p>🔒 התחבר כדי להגיב</p>
          )}

          <ul>
            {comments.map(comment => (
              <li key={comment._id}>
                <strong>{comment.userId?.username || 'משתמש אנונימי'}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="video-sidebar">
        {otherVideos.map(v => (
          <a key={v.id} href={`/video/${v.id}`}>
            <img src={v.thumbnail} alt={v.title} />
            <div>
              <div className="title">{v.title}</div>
              <div className="views">{v.views} צפיות</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
