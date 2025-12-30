import { isAxiosError } from "axios";
import axios from "axios";

export interface LogInResponse {
  accessToken: string;
}

export const LogIn = async (username: string, password: string, deviceId: string) => {
  try {
    const res = await axios.post<LogInResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      username: username.trim(),
      password: password.trim(),
      deviceId: deviceId.trim(),
    },
    { withCredentials: true }
  );
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
}