import axios from "./axiosClient";

export interface LogInResponse {
  accessToken: string;
}

export function logIn(username: string, password: string, deviceId: string) {
  return axios.post<LogInResponse>(
    `/v1/api/auth/login`,
    {
      username: username.trim(),
      password: password.trim(),
      deviceId: deviceId.trim(),
    },
    {withCredentials: true}
  );
}
