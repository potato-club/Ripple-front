import { axiosInstance } from "./axiosClient";

export interface LogInResponse {
  accessToken: string;
}

export function logIn(username: string, password: string, deviceId: string) {
  return axiosInstance.post<LogInResponse>(
    `/api/auth/login`,
    {
      username: username.trim(),
      password: password.trim(),
      deviceId: deviceId.trim(),
    },
  );
}