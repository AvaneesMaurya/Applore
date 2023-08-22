import React, { useState } from "react";

function BlogList({ blogs, onDeleteBlog, onUpdateBlog }) {
  const [editingBlogId, setEditingBlogId] = useState(null);
  const [updatedContent, setUpdatedContent] = useState("");

  const handleUpdate = (blog) => {
    const updatedBlog = { ...blog, content: updatedContent };
    onUpdateBlog(updatedBlog);
    setEditingBlogId(null);
    setUpdatedContent("");
  };

  return (
    <div>
      <h2>Approved Blogs</h2>
      <ul>
        {blogs.length > 0 ? (
          blogs.map((blog, index) => (
            <li key={index}>
              <h3>{blog.title}</h3>
              {editingBlogId === blog.id ? (
                <div>
                  <textarea
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                  />
                  <button onClick={() => handleUpdate(blog)}>Save</button>
                </div>
              ) : (
                <p>{blog.content}</p>
              )}
              <button onClick={() => setEditingBlogId(blog.id)}>Edit</button>
              <button onClick={() => onDeleteBlog(blog.id)}>Delete</button>
            </li>
          ))
        ) : (
          <>
            <div>
              <p> No Approved Blogs</p>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default BlogList;
