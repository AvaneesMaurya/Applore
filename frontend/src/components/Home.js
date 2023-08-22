import React, { useEffect, useState } from "react";
import "./home.css";
import "./AdminPanel.css";
import { getAllBlogsForHome, getBlogAsPerUser } from "../services/blogServices";

function Home({ onDeleteBlog, onUpdateBlog, isLogin, isAdmin }) {
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [blogs, setBlogs] = useState([]);
  console.log(isAdmin, "isAdmin");
  useEffect(() => {
    if (isLogin) {
      getBlogAsPerUser()
        .then((res) => {
          setBlogs(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllBlogsForHome()
        .then((res) => {
          setBlogs(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleUpdate = (blog) => {
    const updatedBlog = { ...blog, content: updatedContent };
    onUpdateBlog(updatedBlog);
    setEditingBlogId(null);
    setUpdatedContent("");
  };
  const handleCancel = (blog) => {
    setEditingBlogId(null);
  };

  return (
    <div className="container">
      <h2 className="blogs-header">Blogs</h2>
      <div className="parent-container">
        <div className="left-section"></div>
        <div className="center-section">
          <ul className="blog-list">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <li key={index} className="blog-item">
                  <h3>{blog.title}</h3>

                  <p>{blog.content}</p>
                </li>
              ))
            ) : (
              <div className="no-blogs">
                <p>No Approved Blogs</p>
              </div>
            )}
          </ul>
        </div>
        <div className="right-section"></div>
      </div>{" "}
    </div>
  );
}

export default Home;
