import axios from "axios";

const api = axios.create({
  baseURL: "https://almoxarifado-dashboard-production.up.railway.app",
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔐 interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🚨 interceptor de resposta (opcional, mas MUITO útil)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token inválido ou expirado
      localStorage.removeItem("token");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;