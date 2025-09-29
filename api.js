// api.js
import axios from "axios";

const API_URL = "http://10.92.3.202:5000";

const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
    (config) => {
        console.log(`🔄 Fazendo requisição para: ${config.url}`);
        return config;
    },
    (error) => {
        console.log("❌ Erro na requisição:", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        console.log(`✅ Resposta recebida de: ${response.config.url}`);
        return response;
    },
    (error) => {
        console.log("❌ Erro na resposta:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export { API_URL };
export default api;
