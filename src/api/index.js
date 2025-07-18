import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
 baseURL: API_BASE_URL,
 timeout: 10000,
 headers: {
  'Content-Type': 'application/json',
  Accept: 'application/json',
 },
});

api.interceptors.request.use(
 config => {
  const token = localStorage.getItem('authToken');
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
 },
 error => Promise.reject(error),
);

api.interceptors.response.use(
 response => response.data,
 error => {
  if (error.response?.status === 401) {
   localStorage.removeItem('authToken');
   window.location.href = '/login';
  }
  return Promise.reject(error.response?.data || error.message);
 },
);

export default api;
