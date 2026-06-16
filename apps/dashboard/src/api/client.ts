import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, // Required for better-auth cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors for response handling here
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
