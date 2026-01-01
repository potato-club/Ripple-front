import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const DeleteUser = async () => {
  try {
    const res = await axiosInstance.delete(`/api/users/me`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};