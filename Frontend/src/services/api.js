import axios from "axios";

const api = axios.create({
  baseURL: "https://almoxarifado-dashboard-production.up.railway.app"
});

export default api;