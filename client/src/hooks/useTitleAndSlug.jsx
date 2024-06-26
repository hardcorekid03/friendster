import { useState } from 'react';
import slugify from 'slugify'; 

const useTitleAndSlug = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    const newSlug = slugify(newTitle, { lower: true });
    setSlug(newSlug);
  };

  const resetTitleAndSlug = () => {
    setTitle('');
    setSlug('');
  };

  return { title, setTitle, slug, setSlug, handleTitleChange, resetTitleAndSlug };
};

export default useTitleAndSlug;