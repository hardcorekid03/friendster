import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async ({ username, email, password, birthdateString, location, gender }) => {
    setIsLoading(true);
    setError(null);

    const userData = {
      username,
      email,
      password,
      birthdateString,
      location,
      gender,
    };

    try {
      const response = await axios.post("api/user/signup", userData, {
        headers: { "Content-Type": "application/json" },
      });

      const json = response.data;

      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update AuthContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "An error occurred");
    }
  };

  return { signup, isLoading, error };
};
