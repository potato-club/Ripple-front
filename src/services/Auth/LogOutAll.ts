import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import type { ApiErrorResponse } from "../../types/apiErrorResponse";

export const LogOutAll = async () => {
  try {
    const res = await axiosInstance.post(`/api/auth/logout/all`);
    return res;
  } catch (error) {
    if(isAxiosError<ApiErrorResponse>(error)) {
      console.log(error.response?.data);
      return error.response;
    }
  }
};
