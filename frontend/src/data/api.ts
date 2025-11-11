import axios from "axios";

const API_BASE = import.meta.env.DEV
  ? "/api"
  : `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_BASE,
});

export default api;
