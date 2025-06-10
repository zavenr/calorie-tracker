import axios from "axios";

const API_BASE = "http://localhost:3001/api";

// Get all food logs
export const getFoodLogs = async () => {
  const res = await axios.get(`${API_BASE}/foodlogs`);
  return res.data;
};

// Create a new food log
export const createFoodLog = async (log) => {
  const res = await axios.post(`${API_BASE}/foodlogs`, log);
  return res.data;
};
