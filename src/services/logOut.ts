import axios from "axios";
import { useAuthStore } from "../stores/useAuthStore";

export const logOut = () => {
  const deviceId = useAuthStore.getState().deviceId;
  return axios.post(
    `https://${import.meta.env.VITE_API_URL}/api/auth/logout`,
    deviceId
  );
};
