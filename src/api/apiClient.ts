import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create an Axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

export default apiClient;
