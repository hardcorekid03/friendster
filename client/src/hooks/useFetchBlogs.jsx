// src/hooks/useFetchBlogs.js
import { useState, useEffect } from 'react';
import api from '../api/Api'; // Adjust the import based on your project structure
import { useAuthContext } from './useAuthContext';

const useFetchBlogs = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get("api/blogs/", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    if (user) {
      fetchBlogs();
    }
  }, [user]);

  return { blogs, loading };
};

export default useFetchBlogs;
