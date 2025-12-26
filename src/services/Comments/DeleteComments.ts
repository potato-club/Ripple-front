import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const DeleteComments = async (commentId : string) => {
  try {
    const res = await axiosInstance.delete(`/api/comments/${commentId}`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
  }
};