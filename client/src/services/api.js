// import axios from 'axios';
 
// // Base URL of our backend server (see server/server.js -> PORT=5000)
// const BASE_URL = 'http://localhost:5000/api';
 
// // Create a reusable Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
 
// // ------------------- Request Interceptor -------------------
// // Before every request is sent, attach the JWT token (if present)
// // from localStorage to the Authorization header.
// api.interceptors.request.use(
//   (config) => {
//     const storedUser = localStorage.getItem('user');
 
//     if (storedUser) {
//       const { token } = JSON.parse(storedUser);
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
 
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
 
// export default api;

import axios from 'axios';

// CHANGED: Base URL now points to your live production backend on Render
const BASE_URL = 'https://learning-management-system-k7hz.onrender.com/api';

// Create a reusable Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ------------------- Request Interceptor -------------------
// Before every request is sent, attach the JWT token (if present)
// from localStorage to the Authorization header.
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const { token } = JSON.parse(storedUser);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;