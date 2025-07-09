// src/pages/LogIn.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LogIn.css'; // ודא שקיים קובץ עיצוב תואם

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('🎉 התחברת בהצלחה!');
        window.location.href = '/'; // ניווט לדף הבית
      } else {
        setError(data.message || 'שגיאה בהתחברות');
      }
    } catch (err) {
      setError('שגיאת שרת');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">🔑 התחברות</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="שם משתמש"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="סיסמה"
          required
        />
        <button type="submit">התחבר</button>
        {error && <p className="login-error">{error}</p>}
      </form>

      <p style={{ marginTop: "20px" }}>
        אין לך חשבון?{" "}
        <Link to="/register" style={{ color: "#e673b0", fontWeight: "bold" }}>
          הירשם כאן
        </Link>
      </p>
    </div>
  );
}
