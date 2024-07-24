import { useState, useEffect } from "react";
import api from "../api/Api"; // Adjust the import based on your project structure
import {  useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

function useFetchUserFavorite() {
    const { user } = useAuthContext();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState(new Set()); // State to manage favorite blogs
  
    const { id } = useParams();
  
    const fetchBlogs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get(`api/blogs/favorites/myfavorites/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const blogsData = response.data;
  
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
              return { ...blog, authorId: authorDetails.username, authorImage: authorDetails.userimage  }; // Assuming authorId is directly accessible in authorDetails
            
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
  
    useEffect(() => {
      fetchBlogs();
    }, [user, favorites]); // Add 'favorites' as a dependency here
  
    useEffect(() => {
      const fetchFavorites = async () => {
        if (!user) {
          setLoading(false);
          return;
        }
        try {
          const response = await api.get("api/blogs/favorites/myfavorites", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setFavorites(new Set(response.data.map((fav) => fav._id)));
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };
      fetchFavorites();
    }, [user, id, favorites]);
  
    const handleFavorite = async (blogId) => {
      if (favorites.has(blogId)) {
        // Remove from favorites
        try {
          await api.delete(`api/blogs/favorites/${blogId}`, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            newFavorites.delete(blogId);
            return newFavorites;
          });
        } catch (error) {
          console.error(
            "Error removing favorite:",
            error.response ? error.response.data : error.message
          );
        }
      } else {
        // Add to favorites
        try {
          await api.post(
            `api/blogs/favorites/${blogId}`,
            { blogId },
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          setFavorites((prevFavorites) => new Set(prevFavorites).add(blogId));
        } catch (error) {
          console.error(
            "Error adding favorite:",
            error.response ? error.response.data : error.message
          );
        }
      }
    };
    
    return { blogs, loading, setLoading, favorites, handleFavorite};
}

export default useFetchUserFavorite