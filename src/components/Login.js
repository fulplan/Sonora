import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Simple authentication - replace with real auth in production
    if (username === "admin" && password === "admin") {
      onLogin(true);
      navigate("/");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <img src="/fbi-logo.png" alt="FBI Logo" className="auth-logo" />
          <h2>Proxy Toolkit Login</h2>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>Federal Bureau of Investigation - Secure Access</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
