import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export const BookmarkFeed = async (feedId : number) => {
  try {
    const res = await axiosInstance.post(`/api/feeds/${feedId}/bookmarks`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
}