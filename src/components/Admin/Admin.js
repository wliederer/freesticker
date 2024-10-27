// src/components/AdminLogin/AdminLogin.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'


function Admin({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const adminUser = process.env.REACT_APP_ADMIN_USER;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    if (username === adminUser && password === adminPassword) {
      setIsAuthenticated(true);
      navigate('/admin');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}

export default Admin;
