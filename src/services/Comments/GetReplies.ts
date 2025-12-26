import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type CommentSortType = "LATEST" | "MOST_LIKED";

export interface GetRepliesResponse {
  comments: [
    {
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
      createdAt: string
    }
  ],
  nextCursor: number,
  hasNext: boolean
}

// 대댓글 조회임
/**
 * 
 * 특정 루트 댓글(commentId)의 대댓글 목록을 커서 기반으로 조회합니다.
 * 요청 feedId와 루트 댓글의 feedId가 다르면 실패합니다(INVALID_COMMENT_THREAD).
 */

export const GetReplies = async (feedId : number, commentId : number, cursorId: number, size: number, sort: CommentSortType) => {
  try {
    const res = await axiosInstance.get<GetRepliesResponse>(`/api/feeds/${feedId}/comments/${commentId}/replies`, {params: {
        cursorId: cursorId, 
        size: size,
        sort: sort
    }});
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};