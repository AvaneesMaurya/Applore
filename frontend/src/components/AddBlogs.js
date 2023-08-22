import React, { useState } from "react";
import "./home.css";
import "./AdminPanel.css";
import { createBlog } from "../services/blogServices";
function AddBlogs() {
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");

  const handleUpdate = () => {
    const blogData = {
      title: updatedTitle,
      content: updatedContent,
    };
    createBlog(blogData)
      .then((res) => {
        setUpdatedContent("");
        setUpdatedTitle("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setUpdatedContent("");
  };

  return (
    <div className="container">
      <h2 className="blogs-header">Add Blogs</h2>
      <div className="parent-container">
        <div className="left-section"></div>
        <div className="center-section">
          <ul className="blog-list">
            <li className="blog-item">
              <div className="edit-form">
                <div className="input-container">
                  <textarea
                    rows={1}
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                </div>
                <div className="input-container">
                  <textarea
                    rows={10}
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                </div>
                <div className="button-container">
                  <button
                    className="save-button"
                    onClick={() => handleCancel()}
                  >
                    Cancel
                  </button>
                  <button
                    className="save-button"
                    onClick={() => handleUpdate()}
                  >
                    save
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="right-section"></div>
      </div>{" "}
    </div>
  );
}

export default AddBlogs;
