import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const DeleteBookmarkFeed = async (feedId : number) => {
  try {
    const res = await axiosInstance.delete(`/api/feeds/${feedId}/bookmarks`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
}