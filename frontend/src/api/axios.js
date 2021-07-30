import axios from "axios";

import { getAccessToken, setAccessToken } from "#root/helpers/accessToken";

export const CancelToken = axios.CancelToken;
export const isCancel = axios.isCancel;

export const BASE_URL_DATA_REQUEST =
  process.env.NODE_ENV === "production" ? "/api/v1" : "http://localhost:5000";

export const authRequest = axios.create({ baseURL: BASE_URL_DATA_REQUEST, withCredentials: true });

export const dataRequest = axios.create({ baseURL: BASE_URL_DATA_REQUEST, withCredentials: true });

dataRequest.interceptors.request.use(
  config => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  err => {
    Promise.reject(err);
  }
);

//response interceptor to refresh token on receiving token expired error
dataRequest.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url.includes("refresh_token")) {
      window.location.href = "/login";
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await authRequest.post("/auth/refresh_token", null, { withCredentials: true });

        if (res.status >= 200 && res.status < 300) {
          setAccessToken(res.data.accessToken);
          return dataRequest(originalRequest);
        }
      } catch (err) {
        console.log(err.response);
        return dataRequest(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
