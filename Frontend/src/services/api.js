import axios from "axios";

const api = axios.create({
  baseURL: "https://backend.up.railway.app"
});

export default api;