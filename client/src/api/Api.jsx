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
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        const errorMessage = error.response.data.error;
        if (errorMessage === 'Token expired') {
          alert('Your session has expired. Please log in again.'); // Alert for session expiration
          localStorage.removeItem('user');
          window.location.href = '/signin'; // Redirect to login page
        }
      } else if (status === 500) {
        alert('An unexpected error occurred. Redirecting to page 500.'); // Alert for 500 error
        window.location.href = '/500'; // Redirect to page 500
      }
    }
    return Promise.reject(error);
  }
);

export default api;
