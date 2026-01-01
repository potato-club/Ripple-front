import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type FeedVisibility = "PUBLIC" | "FOLLOWERS" | "PRIVATE"

export interface PatchVisibilityFeedResponse {
  success: boolean,
  data: string,
  message: string
}

export const PatchVisibilityFeed = async (feedId : number, visibility: FeedVisibility) => {
  try {
    const res = await axiosInstance.patch<PatchVisibilityFeedResponse>(`/api/feeds/${feedId}/visibility`, {
      visibility: visibility
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};