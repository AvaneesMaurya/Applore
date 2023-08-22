import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../services/loginServices";
import "./LoginForm.css";

function LoginForm({
  password,
  username,
  error,
  setPassword,
  setUsername,
  handleLogin,
}) {
  return (
    <div className="login-form">
      <h2>Login</h2>
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
      {error && <p className="error-message">{error}</p>}
      <button
        onClick={() => {
          handleLogin();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;
