import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { URL } from "../pages/url";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (identifier, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(URL + "/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update AuthContext
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};
