import { useState, useEffect } from "react";
import api from "../api/Api"; // Import the Axios instance

const useFavorites = (user) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const response = await api.get("/api/favorites", {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setFavorites(response.data);
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      };

      fetchFavorites();
    }
  }, [user]);

  const addToFavorites = async (blogId) => {
    if (!user) return;

    try {
      const response = await api.post(
        "/api/favorites",
        { blogId },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return { favorites, addToFavorites };
};

export default useFavorites;
