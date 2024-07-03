import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import toast from "react-hot-toast";

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
      const postResponse = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!postResponse.ok) {
        throw new Error("Failed to delete the post");
      }

      // Delete the associated image if it exists
      if (blogDetails.image) {
        const imageUrl = blogDetails.image;
        const imageName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        
        const imageResponse = await fetch(`/api/upload/${imageName}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!imageResponse.ok) {
          throw new Error("Failed to delete the image");
        }
      }

      toast.success("Post and image deleted successfully");
      navigate("/"); // Redirect to home after successful deletion
    } catch (error) {
      console.error(error);
      setError("Failed to delete post and image");
      navigate("/500");
    } finally {
      setLoading(false);
    }
  };

  return { handleDelete, loading, error };

}

export default useDeleteBlog

