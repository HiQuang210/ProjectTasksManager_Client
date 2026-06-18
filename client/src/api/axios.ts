import axios from "axios";

const API_URI = import.meta.env.VITE_APP_BASE_URI;

export const api = axios.create({
  baseURL: `${API_URI}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});