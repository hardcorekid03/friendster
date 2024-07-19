import api from "../api/Api";

const useFavoriteToggle = (id, user, isFavorite, setIsFavorite) => {
  const handleToggleFavorite = async () => {
    if (!user) return;

    try {
      if (isFavorite) {
        await api.delete(`/api/blogs/favorites/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } else {
        await api.post(
          `/api/blogs/favorites/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
      alert("Failed to update favorite status.");
    }
  };

  return handleToggleFavorite;
};

export default useFavoriteToggle;
