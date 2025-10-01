import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Create axios instance with common config
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for loading states
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || "An error occurred";

    // Handle network errors
    if (!error.response) {
      throw new Error("Network error - please check your connection");
    }

    // Handle API errors
    throw new Error(message);
  }
);

// Food logs API
export const foodLogsAPI = {
  // Get all food logs
  getAll: async () => {
    const response = await api.get("/foodlogs");
    return response.data;
  },

  // Create new food log
  create: async (foodLog) => {
    const logData = {
      ...foodLog,
      date: new Date().toISOString(),
      user_id: "demo-user", // TODO: Replace with actual user ID from auth
    };

    const response = await api.post("/foodlogs", logData);
    return response.data;
  },

  // Delete all logs (for development)
  deleteAll: async () => {
    const response = await api.delete("/foodlogs");
    return response.data;
  },
};

// Health check
export const healthCheck = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error("API server is not responding");
  }
};

export default api;
