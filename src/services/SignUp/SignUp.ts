import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export interface SignUpResponse{
  username: string,
  email: string,
  password: string
}

export const SignUp = async (username: string, email: string, password: string) => {
  try {
    const res = await axiosInstance.post(`/api/users`, {username: username.trim(), email: email.trim(), password: password.trim() });
    return res
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};