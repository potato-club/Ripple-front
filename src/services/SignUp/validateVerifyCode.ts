import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export const ValidateVerifyCode = async (email: string, code: string) => {
  try {
    const res = await axiosInstance.post(`/api/users/email/verification/verify`, { email, code });
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};