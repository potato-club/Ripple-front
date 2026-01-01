import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export const LogOutAll = async () => {
  try {
    const res = await axiosInstance.post(`/api/auth/logout/all`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
      return error.response;
    }
  }
};
