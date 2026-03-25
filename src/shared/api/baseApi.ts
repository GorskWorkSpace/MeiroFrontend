import axios from "axios";

export const baseApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://meiro-event.ru/api/v1/",
});

baseApi.interceptors.request.use(async (config) => {
  let token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    const response = await axios.post<{ token: string }>(
      "https://meiro-event.ru/api/v1/user/login",
    );
    token = response.data.token;
    localStorage.setItem("accessToken", token);

    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
