import axios, { isAxiosError } from "axios";
import { refreshToken } from "./Auth/refreshToken";
import { getCookie } from "../utils/getCookie";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // 쿠키 인증 포함
});

// 요청
axiosInstance.interceptors.request.use((request) => {
  // AT 포함
  const accessToken = getCookie(
    `${import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN}`
  );
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  // else {
  //   // AT 없으면 취소
  //   return Promise.reject("AT is not Found");
  // }
  return request;
});

// 응답
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // AxiosError 아니면 처리 안 함
    if (!isAxiosError(error)) return error;

    const originalRequest = error.config;
    // 임시
    if (!originalRequest) return Promise.reject(error);
    console.log("[Axios] Original Request:", originalRequest);

    // 401 Unauthorized
    if (error.response?.status === 401) {
      try {
        // refresh token으로 새로운 access token 발급
        const newAccessToken = await refreshToken();

        // 실패했던 요청에 새로운 토큰 재적용
        // originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 요청 재시도
        return axios(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패 → 로그아웃 처리 등
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
