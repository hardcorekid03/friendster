// src/hooks/useCreatePost.js

import { useState } from 'react';

const useCreatePost = (resetTitleAndSlug, setBlogbody, setAuthor, setError) => {
  const [error, setSubmitError] = useState('');

  const handleSubmit = async (blogData) => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify(blogData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      if (!response.ok) {
        setSubmitError(json.error);
      } else {
        resetTitleAndSlug();
        setBlogbody('');
        setAuthor('');
        setError(null);
        console.log('Blog posted!');
      }
    } catch (error) {
      setSubmitError('Failed to submit the blog post.');
      console.error('Error while submitting:', error);
    }
  };

  return { error, handleSubmit };
};

export default useCreatePost;
