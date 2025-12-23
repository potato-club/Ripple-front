import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';
import { RefreshToken } from './Auth/RefreshToken'

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // 쿠키 인증 포함
});

// 요청시 엑세스 토큰 같이 보내기
axiosInstance.interceptors.request.use((request)=>{
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest)
    // 401 Unauthorized(임시) && 토큰 요청 재시도 안 한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 표시

      try {
        // refresh token으로 새로운 access token 발급
        const { accessToken: newAccessToken } = await RefreshToken(useAuthStore.getState().deviceId);

        // Zustand 스토어에 토큰 업데이트
        useAuthStore.setState({ accessToken: newAccessToken });

        // 실패했던 요청에 새로운 토큰 재적용
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 요청 재시도
        return axios(originalRequest);
      } catch (refreshError) {
        // 토큰 재발급 실패 → 로그아웃 처리 등
        useAuthStore.setState({ accessToken: null });
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);