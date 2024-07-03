import { useState } from 'react';
import axios from 'axios';

const useAddToFavorites = (user, blogDetails) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const addToFavorites = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        "/api/favorites/add",
        { blogId: blogDetails._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccessMessage(response.data.message);
      // Optionally, update the local state or UI to reflect the change
    } catch (error) {
      console.error('Error adding to favorites:', error);
      setError("An error occurred while adding to favorites");
    } finally {
      setIsLoading(false);
    }
  };

  return { addToFavorites, isLoading, error, successMessage };
};

export default useAddToFavorites;
