import { useState, useEffect } from "react";
import api from "../api/Api";
import { useAuthContext } from "./useAuthContext";
import { useParams } from "react-router-dom";

const useFetchUser = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        return;
      }

      try {
        const response = await api.get(`/api/user/${user.id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch user data");
        }
        const data = response.data;
        setUserData(data);
        const defaultImageUrl = data.userbanner; // Adjust based on your data structure
        const img = data.userimage; // Adjust based on your data structure

        setImageSrc(defaultImageUrl);
        setUserImg(img);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user, id]);

  return { userData, imageSrc, setImageSrc, userImg, setUserImg };
};

export default useFetchUser;
