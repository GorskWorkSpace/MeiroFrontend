import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "https://meiro-event.ru/api/v1/";
const TOKEN_KEY = "accessToken";

export const baseApi = axios.create({
  baseURL: API_URL,
});

// Общий промис логина, чтобы параллельные запросы не логинились по несколько раз
let loginPromise: Promise<string> | null = null;

const login = () => {
  loginPromise ??= axios
    .post<{ token: string }>("user/login", undefined, { baseURL: API_URL })
    .then(({ data }) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      return data.token;
    })
    .finally(() => {
      loginPromise = null;
    });

  return loginPromise;
};

baseApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(TOKEN_KEY) ?? (await login());
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

baseApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
