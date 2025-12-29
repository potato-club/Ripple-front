import axios from "axios";
import { setCookie } from "../../utils/setCookie";

export const refreshToken = async () => {
  console.log("[JWT] Attempting to refresh JWT..")
  const deviceId = localStorage.getItem(`${import.meta.env.VITE_LOCALSTORAGE_BASE}device_id`);
  if (!deviceId) throw new Error("DeviceId 없음");
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, undefined, { headers: {"X-Device-Id": deviceId}, withCredentials: true });
  const at = res.data.accessToken;
  if (!(typeof at === "string")) throw new Error("엑세스 토큰을 받지 못함");
  setCookie(import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN, at);
  return at;
};