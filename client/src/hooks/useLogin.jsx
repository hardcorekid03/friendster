import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      const { id, token } = json;

      // Save the user ID and token to local storage
      // localStorage.setItem('userId', id);
      // localStorage.setItem('token', token);

      // Fetch user details
      const userResponse = await fetch(`/api/user/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userData = await userResponse.json();

      if (userResponse.ok) {
        // Save the user data to local storage
        localStorage.setItem('user', JSON.stringify(userData));

        // Update the auth context
        dispatch({ type: 'LOGIN', payload: userData });

        setIsLoading(false);
      } else {
        setIsLoading(false);
        setError(userData.error);
      }
    }
  };

  return { login, isLoading, error };
};
