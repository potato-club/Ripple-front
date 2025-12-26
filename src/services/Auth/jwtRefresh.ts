import axios from "axios";
import { setCookie } from "../../utils/setCookie";

/**
 * JWT 리프레시
 * 성공하면 true 반환합니다.
 * DeviceId가 없으면 false 반환합니다.
 */
export const jwtRefresh = async (): Promise<boolean> => {
  const deviceId = localStorage.getItem(`${import.meta.env.VITE_LOCALSTORAGE_BASE}device_id`);
  if (!deviceId) return false;
  const accessToken = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, undefined, { headers: {"X-Device-Id": deviceId} });
  if (!accessToken.data) return false;
  setCookie(import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN, accessToken.data);
  return true;
};
