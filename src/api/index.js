import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_SERVER_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const authTokenString = localStorage.getItem("authToken");

    if (authTokenString) {
      const token = JSON.parse(authTokenString);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      const cartToken = localStorage.getItem("cartToken");
      if (
        (cartToken && config.url.includes("/cart")) ||
        config.url.includes("/verify-otp")
      ) {
        config.headers["cart_token"] = cartToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        localStorage.setItem("redirectAfterLogin", currentPath);
      }
      localStorage.removeItem("authToken");
      localStorage.removeItem("cartToken");
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
