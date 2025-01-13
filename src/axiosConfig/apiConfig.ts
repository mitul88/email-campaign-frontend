import axios from "axios";
import authService from "../service/authService";

const apiClient = axios.create({
  baseURL: "https://localhost:4000",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  async (config) => {
    let token = authService.getAccessToken();

    if (!token) {
      await authService.refreshToken();
      token = authService.getAccessToken();
    }

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
