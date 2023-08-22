// Home.js

import React, { useState, useEffect } from "react";
import "./home.css";
import "./AdminPanel.css";
import {
  getPendingBlogs,
  updateBlogs,
  deletedBlogs,
  approveBlogs,
} from "../services/blogServices";

function PendingBlogs({ isAdmin }) {
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [refresh, setRefresh] = useState(true);
  useEffect(() => {
    if (refresh) {
      getPendingBlogs()
        .then((res) => {
          setUpdatedContent("");
          setEditingBlogId(null);
          setBlogs(res.data.data);
          setRefresh(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [refresh]);
  const handleUpdate = () => {
    const updateBlogData = {
      _id: editingBlogId,
      content: updatedContent,
    };
    updateBlogs(updateBlogData)
      .then((res) => {
        setUpdatedContent("");
        setEditingBlogId(null);
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleApproveBlogs = (_id) => {
    console.log(_id);
    approveBlogs(_id)
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {});
  };
  const handleDelete = (_id) => {
    deletedBlogs(_id)
      .then((res) => {
        setRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setEditingBlogId(null);
    setUpdatedContent("");
    setUpdatedTitle("");
  };
  return (
    <div className="container">
      <h2 className="blogs-header">Pending Blogs</h2>
      <div className="parent-container">
        <div className="left-section"></div>
        <div className="center-section">
          <ul className="blog-list">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <li key={index} className="blog-item">
                  <h3>{blog.title}</h3>

                  {editingBlogId === blog._id ? (
                    <div className="edit-form">
                      <textarea
                        value={updatedContent}
                        onChange={(e) => setUpdatedContent(e.target.value)}
                      />
                      <div className="button-container">
                        <button
                          className="save-button"
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </button>
                        <button
                          className="save-button"
                          onClick={() => handleUpdate(blog)}
                        >
                          save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p>{blog.content}</p>
                  )}

                  {editingBlogId !== blog._id && (
                    <div className="button-container">
                      {!isAdmin && (
                        <button
                          className="save-button"
                          onClick={() => setEditingBlogId(blog._id)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="save-button"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                      {isAdmin && (
                        <button
                          className="save-button"
                          onClick={() => handleApproveBlogs(blog._id)}
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  )}
                </li>
              ))
            ) : (
              <div className="no-blogs">
                <p>No Approved Pending</p>
              </div>
            )}
          </ul>
        </div>
        <div className="right-section"></div>
      </div>{" "}
    </div>
  );
}

export default PendingBlogs;
