import { axiosInstance } from "./axiosClient";
import { useAuthStore } from "../stores/useAuthStore";

export const logOut = () => {
  const deviceId = useAuthStore.getState().deviceId;
  return axiosInstance.post(
    `/api/auth/logout`,
    deviceId
  );
};
