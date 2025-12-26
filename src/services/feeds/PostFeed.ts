import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type visibilityType = "PUBLIC" | "FOLLOWERS" | "PRIVATE"
type FeedStatus = "PUBLISHED" | "DELETED"

export interface PostFeedResponse {
  id: number,
  author: {
    id: number,
    username: string,
    profileImageUrl: string
  },
  content: string,
  tags: string[],
  likeCount: number,
  bookmarkCount: number,
  commentCount: number,
  viewCount: number,
  thumbnail: string,
  mediaUrls: string[],
  feedStatus: FeedStatus,
  visibility: visibilityType,
  createdAt: string,
  updatedAt: string
}

export const PostFeed = async (content: string, thumbnail: string, mediaKeys: string[], tags: string[], visibility: visibilityType) => {
  try {
    const res = await axiosInstance.post<PostFeedResponse>(`/api/feeds`, {
        content: content,
        thumbnail: thumbnail,
        mediaKeys: mediaKeys,
        tags: tags,
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