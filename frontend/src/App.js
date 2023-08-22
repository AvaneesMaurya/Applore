import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import Navigation from "./components/Navigation";
import LoginForm from "./components/LoginForm";
import UserItem from "./components/UserItem";
import "./App.css";
import "./components/LoginForm.css";
import Home from "./components/Home";
import PendingBlogs from "./components/PendingBlogs";
import AddBlogs from "./components/AddBlogs";
import { login, logout } from "./services/loginServices";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = () => {
    const loginData = {
      userName: username,
      password: password,
    };
    login(loginData)
      .then((res) => {
        localStorage.setItem("jwtToken", res.data.jwtToken);
        localStorage.setItem("userData", res.data.userData);
        setIsAdmin(res.data.userData.isAdmin);
        setIsLogin(true);
        setError("");
      })
      .catch((err) => {
        setError("Invalid username or password");
      });
  };

  const Logout = () => {
    logout()
      .then((res) => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userData");
        setIsLogin(false);
        setIsAdmin(false);
        window.location.href = "/";
      })
      .catch((err) => {});
  };
  const param = {
    isAdmin,
    isLogin,
    Logout,
    error,
    setPassword,
    setUsername,
    handleLogin,
    password,
    username,
  };
  return (
    <Router>
      <Navigation {...param} />
      <Routes>
        {!isLogin ? (
          <Route exact path="/" element={<LoginForm {...param} />} />
        ) : (
          <Route exact path="/" element={<Home {...param} />} />
        )}

        {!isLogin ? (
          <Route exact path="/Login" element={<LoginForm {...param} />} />
        ) : (
          <Route exact path="/Login" element={<Home {...param} />} />
        )}

        <Route exact path="/home" element={<Home {...param} />} />
        <Route exact path="/addBlogs" element={<AddBlogs {...param} />} />
        {isAdmin && <Route exact path="/users" element={<UserItem />} />}
        <Route
          exact
          path="/pending_blogs"
          element={<PendingBlogs {...param} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
