import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export interface sendVerifyCodeResponse {
  email: string
}

export const sendVerifyCode = async (email: string) => {
  try {
    const res = await axiosInstance.post<sendVerifyCodeResponse>(`/api/users/email/verification/send`, {email: email.trim()});
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};