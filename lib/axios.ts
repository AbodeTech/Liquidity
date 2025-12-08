import axios from "axios";
import { auth } from "./auth";


export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const adminAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const noAuthAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

adminAxiosInstance.interceptors.request.use((config) => {
  const token = auth.getAdminToken()
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

adminAxiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response?.status === 401 && !error.config.url.includes("/login")) {
    auth.removeAdminToken();
    window.location.href = "/admin/login";
  }
  return Promise.reject(error);
})

axiosInstance.interceptors.request.use((config) => {
  const token = auth.getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
})

// axiosInstance.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   if (error.response.status === 401) {
//     auth.removeToken();
//     window.location.href = "/login";
//   }
//   return Promise.reject(error);
// })