import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface PostCommentsResponse {
  id: number,
  author: {
    id: number,
    username: string,
    profileImageUrl: string
  }
  rootCommentId: number,
  replyToUserId: number,
  replyToCommentId: number,
  content: string,
  likeCount: number,
  deleted: boolean,
  createdAt: string,
}

/**
 * 
 * 피드에 댓글을 작성합니다.
 * parentId가 null이면 루트 댓글
 * parentId가 있으면 대댓글(답글)이며, parent 댓글의 feedId와 요청 feedId가 다르면 실패합니다.
 */

export const PostComments = async (feedId : string, parentId: string | null, content: string) => {
  try {
    let res;
    if (parentId !== null) {
      res = await axiosInstance.post<PostCommentsResponse>(`/api/feeds/${feedId}/comments`, {
        parentId: parentId,
        content: content
      });
      return res.data;
    } else {
      res = await axiosInstance.post<PostCommentsResponse>(`/api/feeds/${feedId}/comments`, {
        content: content
      });
      
    }
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
  }
};