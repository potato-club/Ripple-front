import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";
import type { ApiErrorResponse } from "../../types/apiErrorResponse";

export const refreshToken = async (deviceId: string) => {
  try {
    const res = await axiosInstance.post(`/api/auth/refresh`, 
      {
        header: {
          'X-Device-Id': deviceId.trim(),
        }
      }
    );
    return res.data;
  } catch (error) {
    if(isAxiosError<ApiErrorResponse>(error)) {
      console.log(error.response?.data);
      return error.response;
    }
  }
};