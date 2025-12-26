import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type CommentSort = "LATEST" | "MOST_LIKED";

export interface GetCommentsResponse {
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

/**
 * 피드의 루트 댓글을 커서 기반으로 조회합니다.
 *
 * sort=LATEST: cursorId 기반 페이징(nextCursor/hasNext 제공)
 * sort=MOST_LIKED: 좋아요순(커서 페이징 비활성: nextCursor=null, hasNext=false)
 */

export const GetComments = async (feedId : string, cursorId: string, size: string, sort: CommentSort) => {
  try {
    const res = await axiosInstance.get<GetCommentsResponse>(`/api/feeds/${feedId}/comments`, {params: {
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
  }
};