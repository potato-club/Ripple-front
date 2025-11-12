import axios from "./axiosClient";
import { useAuthStore } from "../stores/useAuthStore";

export const logOut = () => {
  const deviceId = useAuthStore.getState().deviceId;
  return axios.post(
    `/v1/api/auth/logout`,
    deviceId
  );
};
