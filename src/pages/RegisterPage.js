// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('🎉 נרשמת בהצלחה!');
        navigate('/login');
      } else {
        setError(data.message || 'שגיאה בהרשמה');
      }
    } catch (err) {
      setError('שגיאת שרת');
    }
  };

  return (
    <div className="register-container">
      <h2>✨ הרשמה</h2>
      <form onSubmit={handleRegister} className="register-form">
        <input
          type="text"
          placeholder="שם משתמש"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="אימייל"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="סיסמה"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">🚀 הרשם</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
