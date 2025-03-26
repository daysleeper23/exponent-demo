import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create an Axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
  },
});

export default apiClient;
