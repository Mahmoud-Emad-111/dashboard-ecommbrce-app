import axios from "axios";

const https = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

https.interceptors.request.use(config => {
  const token = localStorage.getItem('user');
  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default https;