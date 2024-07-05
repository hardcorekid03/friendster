import axios from 'axios';
import { URL } from "../pages/url";

const api = axios.create({
  baseURL: URL, // URL of the backend server
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response
    return response;
  },
  (error) => {
    // If the response has an error
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.error;
      if (errorMessage === 'Token expired') {
        alert('Your session has expired. Please log in again.'); // Alert for session expiration
        localStorage.removeItem('user');
        window.location.href = '/signin'; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default api;
