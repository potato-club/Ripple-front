import { axiosInstance } from "../axiosClient";
import { useAuthStore } from "../../stores/useAuthStore";
import { isAxiosError } from "axios";

export const LogOut = async () => {
  try {
    const deviceId = useAuthStore.getState().deviceId;
    const res = axiosInstance.post(
    `/api/auth/logout`,
    deviceId
    );
    return res;
  } catch(error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response;
    }
  }
};