import {axiosInstance} from "../axiosClient";
import z from "zod";
import type { CommentSortType } from "../../types/CommentSortType";

const CommentSchema = z.object({
  id: z.number(),
  author: z.object({
    id: z.number(),
    username: z.string(),
    profileImageUrl: z.string().nullable(),
  }),
  rootCommentId: z.number().nullable(),
  replyToUserId: z.number().nullable(),
  replyToCommentId: z.number().nullable(),
  content: z.string().nullable(),
  likeCount: z.number(),
  deleted: z.boolean(),
  createdAt: z.string()
});

const CommentsSchema = z.object({
  comments: z.array(CommentSchema),
  hasNext: z.boolean(),
  nextCursor: z.number().nullable(),
});

type CommentsResponse = z.infer<typeof CommentsSchema>;

function isComments(arr: any): arr is CommentsResponse {
  return CommentsSchema.safeParse(arr).success;
}

/**
 * 피드의 루트 댓글을 커서 기반으로 조회합니다.
 *
 * sort=LATEST: cursorId 기반 페이징(nextCursor/hasNext 제공)
 * sort=MOST_LIKED: 좋아요순(커서 페이징 비활성: nextCursor=null, hasNext=false)
 */

export const getComments = async (
  feedId : number, 
  cursorId?: number,
  size?: number,
  sort?: CommentSortType): Promise<CommentsResponse | false> => {
  try {
    const res = await axiosInstance.get<CommentsResponse>(`/api/feeds/${feedId}/comments`, 
      {
        params: cursorId ? {
          cursorId: cursorId,
          size: size ?? 3,
          sort: sort ?? "LATEST"
        } : {
          size: size ?? 3,
          sort: sort ?? "LATEST"
        }
      });
    const data = res.data;

    if (isComments(data)) {
      console.log("댓글 불러오기 성공:", data);
      return data;
    } else {
      console.error(
        "API 응답이 예상되는 Comment[] 구조와 일치하지 않습니다.",
        data
      );
      return false;
    }
  } catch (error) {
    console.error("피드를 불러오는 중 오류 발생:", error);
    return false;
  }
};