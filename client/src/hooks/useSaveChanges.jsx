import { useState } from "react";
import api from "../api/Api";

const useSaveChanges = (
  user,
  imageSrc,
  selectedFile,
  setIsImageUploaded,
  setSelectedFile,
  setOriginalImageSrc,
  setLoading
) => {
  const [hasChanges, setHasChanges] = useState(false);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    if (!user) {
      setLoading(false);
      return;
    }
    const blog = {};

    if (selectedFile) {
      const data = new FormData();
      const alphanumericKey = Math.random().toString(36).slice(2, 9);
      const filename = `user-${alphanumericKey}-${Date.now()}-banner-${
        selectedFile.name
      }`;

      data.append("img", filename);
      data.append("file", selectedFile);
      blog.userbanner = filename;
      try {
        const imgUpload = await api.post("/api/upload/uploadBanner", data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(imgUpload.data);
        setIsImageUploaded(false);
      } catch (err) {
        console.log("Error uploading image:", err);
      }
    }

    try {
      const response = await api.patch(`/api/user/${user.id}`, blog, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.status === 200) {
        setSelectedFile(null);
        setOriginalImageSrc(imageSrc);
        setHasChanges(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return { handleSaveChanges, hasChanges, setHasChanges };
};

export default useSaveChanges;
