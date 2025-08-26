import axios from "axios";

export interface LogInResponse {
  accessToken: string;
  refreshToken: string;
}

const usernameReg = /^[a-zA-Z0-9_]{3,20}$/;
const passwordReg = /^.{8,72}$/;

export function logIn(username: string, password: string, deviceId: string) {
  if (!usernameReg.test(username.trim()))
    throw new Error("Username is not valid");
  if (!passwordReg.test(password.trim()))
    throw new Error("Password is not valid");
  if (deviceId.trim().length < 1) throw new Error("Device ID is not valid");

  return axios.post<LogInResponse>(
    `https://${import.meta.env.VITE_API_URL}/api/auth/login`,
    {
      username: username.trim(),
      password: password.trim(),
      deviceId: deviceId.trim(),
    }
  );
}
