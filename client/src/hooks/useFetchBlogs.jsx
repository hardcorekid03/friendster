import { useState, useEffect } from "react";
import api from "../api/Api"; // Adjust the import based on your project structure
import { useParams } from "react-router-dom";

import { useAuthContext } from "./useAuthContext";

const useFetchBlogs = () => {
  const { user } = useAuthContext();
  const [blogs, setBlogs] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [authorData, setAuthorData] = useState([]);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchBlogs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`api/blogs/posts/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const blogsData = response.data;
        setBlogData (blogsData)

        // Fetch author details (including authorId) for each blog
        const blogsWithAuthorDetails = await Promise.all(
          blogsData.map(async (blog) => {
            try {
              // Assuming blog.authorId is available in the blog data
              const authorResponse = await api.get(
                `/api/user/${blog.authorId}`,
                {
                  headers: { Authorization: `Bearer ${user.token}` },
                }
              );
              const authorDetails = authorResponse.data;
              setAuthorData (authorDetails )
              return {
                ...blog,
                authorId: authorDetails.username,
                authorImage: authorDetails.userimage,
                authorJoined: authorDetails.createdAt,

              }; // Assuming authorId is directly accessible in authorDetails
            } catch (error) {
              console.error(
                `Error fetching author details for blog ${blog._id}:`,
                error
              );

              return { ...blog, authorId: null }; // Handle error case if author details cannot be fetched
            }
          })
        );

        setBlogs(blogsWithAuthorDetails);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, [user]);

  return { blogs, loading, blogData, authorData};
};

export default useFetchBlogs;
