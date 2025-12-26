import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface GetFeedFullViewResponse {
  id: number,
  authorId: number,
  authorName: string,
  content: string,
  tags: string[],
  imageUrls: string[],
  videoHlsUrl: string,
  videoSourceUrl: string,
  likeCount: number,
  bookmarkCount: number,
  commentCount: number,
  viewCount: number,
  liked: boolean,
  bookmarked: boolean,
  createdAt: string
}

export const GetFeedFullView = async (feedId : number) => {
  try {
    const res = await axiosInstance.get<GetFeedFullViewResponse>(`/api/feeds/${feedId}/fullView`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};