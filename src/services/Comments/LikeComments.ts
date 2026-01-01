import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const LikeComments = async (commentId : number) => {
  try {
    const res = await axiosInstance.post(`/api/comments/${commentId}/likes`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};