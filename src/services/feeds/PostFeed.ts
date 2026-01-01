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
  thumbnailUrl: string,
  feedStatus: FeedStatus,
  visibility: visibilityType,
  createdAt: string,
}
export interface PostFeedRequest {
  content: string,
  tags: string[],
  visibility: visibilityType,
  images?: {
    objectKey: string,
    mimeType: string,
    width: number,
    height: number
    sizeBytes: number
  }[],
  video?: {
    videoPrefix: string,
    durationSec: number,
    mimeType: string,
    width: number,
    height: number,
    sizeBytes: number,
    thumbnail: {
      objectKey: string,
      mimeType: string,
      width: number,
      height: number,
      sizeBytes: number
    }
  },
}

export const PostFeed = async (request: PostFeedRequest) => {
  try {
    const res = await axiosInstance.post<PostFeedResponse>(`/api/feeds`, request);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    return false;
  }
};