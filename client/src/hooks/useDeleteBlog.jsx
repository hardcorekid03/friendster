import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";
import api from "../api/Api"; // Import the Axios instance
import { getStorage, ref, deleteObject } from "firebase/storage";

function useDeleteBlog() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async (id, blogDetails) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setLoading(true);

    try {
      // Delete the post
      const response = await api.delete(`/api/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error(`Failed to delete the post: ${response.statusText}`);
      }

      // Delete the associated image if it exists
      if (blogDetails.image) {
        const imageUrl = blogDetails.image;
        const imagePath = imageUrl.split("/o/")[1]?.split("?")[0]; // Extract the path from the URL

        if (imagePath) {
          // Create a reference to the image in Firebase Storage
          const storage = getStorage(); // Ensure Firebase app is initialized
          const imageRef = ref(
            storage,
            decodeURIComponent(imagePath.replace("images%2F", "images/"))
          );

          // Delete the image from Firebase Storage
          await deleteObject(imageRef);
        }
      }

      toast.success("Post and image deleted successfully");
      navigate("/"); // Redirect to home after successful deletion
    } catch (error) {
      console.error("Error deleting post or image:", error);
      setError("Failed to delete post and image");
      navigate("/500");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };
}

export default useDeleteBlog;
