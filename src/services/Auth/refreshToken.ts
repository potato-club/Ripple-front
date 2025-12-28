import { setCookie } from "../../utils/setCookie";
import {axiosInstance} from "../axiosClient";

export const refreshToken = async () => {
  console.log("[JWT] Attempting to refresh JWT..")
  const deviceId = localStorage.getItem(`${import.meta.env.VITE_LOCALSTORAGE_BASE}device_id`);
  if (!deviceId) throw new Error("DeviceId 없음");
  const accessToken = await axiosInstance.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, undefined, { headers: {"X-Device-Id": deviceId} });
  if (!(typeof accessToken.data.accessToken === "string")) throw new Error("엑세스 토큰을 받지 못함");
  setCookie(import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN, accessToken.data.accessToken);
  return accessToken.data.accessToken;
};