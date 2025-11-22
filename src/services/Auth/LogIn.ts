import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export interface LogInResponse {
  accessToken: string;
}

export const LogIn = async (username: string, password: string, deviceId: string) => {
  try {
    const res = await axiosInstance.post<LogInResponse>(
    `/api/auth/login`,
    {
      username: username.trim(),
      password: password.trim(),
      deviceId: deviceId.trim(),
    },
  );
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
}