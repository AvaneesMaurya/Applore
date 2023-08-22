import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

function Navigation({ isAdmin, isLogin, Logout }) {
  const navItems = isLogin
    ? isAdmin
      ? [
          { label: "Home", path: "/home" },
          { label: "Users", path: "/users" },
          { label: "Pending Blogs", path: "/pending_blogs" },
        ]
      : [
          { label: "Home", path: "/home" },
          { label: "Add Blogs", path: "/addBlogs" },
          { label: "Pending Blogs", path: "/pending_blogs" },
        ]
    : [
        { label: "Home", path: "/home" },
        { label: "Login", path: "/Login" },
      ];
  return (
    <nav className="navigation">
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link to={item.path}>{item.label}</Link>
          </li>
        ))}
        {isLogin && (
          <li>
            <Link>
              <p
                onClick={() => {
                  Logout();
                }}
              >
                Log out
              </p>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
