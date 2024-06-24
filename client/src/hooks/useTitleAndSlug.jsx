// src/hooks/useTitleAndSlug.js
import { useState } from 'react';

const useTitleAndSlug = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setTitle(newTitle);
    const slugValue = newTitle.replace(/ /g, '-').toLowerCase();
    setSlug(slugValue);
  };

  return {
    title,
    slug,
    handleTitleChange,
  };
};

export default useTitleAndSlug
