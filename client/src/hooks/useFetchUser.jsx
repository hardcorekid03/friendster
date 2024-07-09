import { useState, useEffect } from 'react';
import api from '../api/Api';
import { useAuthContext } from './useAuthContext';

const useFetchUser = () => {
  const { user } = useAuthContext();
  const [userData, setUserData] = useState({});
  const [imageSrc, setImageSrc] = useState('');

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
          throw new Error('Failed to fetch user data');
        }

        const data = response.data;
        setUserData(data);
        const defaultImageUrl = data.userimage || 'https://via.placeholder.com/450'; // Adjust based on your data structure
        setImageSrc(defaultImageUrl);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [user]);

  return { userData, imageSrc, setImageSrc };
};

export default useFetchUser;