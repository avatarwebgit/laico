import axios from 'axios';

const API_BASE_URL =
 process.env.REACT_APP_API_BASE_URL || 'https://api.your-ecommerce-app.com/v1';

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



// import axios from 'axios';
// import Cookies from 'js-cookie'; 

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://your-laravel-app.test';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   },
//   withCredentials: true 
// });

// api.interceptors.request.use(
//   async (config) => {
  
//     const csrfToken = Cookies.get('XSRF-TOKEN');
//     if (csrfToken) {
//       config.headers['X-XSRF-TOKEN'] = csrfToken;
//     }
    
//     const authToken = localStorage.getItem('authToken');
//     if (authToken) {
//       config.headers.Authorization = `Bearer ${authToken}`;
//     }
    
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response.data,
//   (error) => {
//     if (error.response?.status === 419) { 
//       return api.get('/sanctum/csrf-cookie').then(() => {
//         return api(error.config);
//       });
//     }
//     if (error.response?.status === 401) {
//       localStorage.removeItem('authToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error.response?.data || error.message);
//   }
// );

// export default api;
