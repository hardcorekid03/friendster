import { useState } from 'react';

const useTitleAndSlug = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const generateSlug = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
      .replace(/\-\-+/g, '-');      // Replace multiple - with single -
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const newSlug = generateSlug(newTitle);
    setSlug(newSlug);
  };

  const resetTitleAndSlug = () => {
    setTitle('');
    setSlug('');
  };

  return { title, setTitle, slug, setSlug, handleTitleChange, resetTitleAndSlug };
};

export default useTitleAndSlug;
