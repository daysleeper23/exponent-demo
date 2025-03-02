import axios from "axios";

const baseURL = "http://localhost:3000";

// Create an Axios instance
const apiClient = axios.create({
  baseURL,
  timeout: 5000,
});

export default apiClient;