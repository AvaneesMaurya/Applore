import React, { useState } from 'react';

function BlogForm({ onAddBlog }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      onAddBlog({ title, content });
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="blog-form">
      <h3>Add a New Blog</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
}

export default BlogForm;
