import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface checkDuplicateUserResponse {
  usernameAvailable: boolean,
  emailAvailable: boolean
}

export const checkDuplicateUser = async (username: string, email: string) => {
  try {
    const res = await axiosInstance.get<checkDuplicateUserResponse>(`/api/users/availability`, { params: { username: username.trim(), email: email.trim() }},);
    if (res.data) {
      return res.data;
    }
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
}