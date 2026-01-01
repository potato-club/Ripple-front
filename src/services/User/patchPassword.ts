import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const PatchPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const res = await axiosInstance.patch(`/api/users/me/password`, {currentPassword: currentPassword.trim(), newPassword: newPassword.trim()});
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};