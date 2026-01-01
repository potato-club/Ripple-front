import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const DeleteFeed = async (feedId: number) => {
  try {
    const res = await axiosInstance.delete(`/api/feeds/${feedId}`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};