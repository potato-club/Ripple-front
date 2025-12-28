import type { Comment } from "../types/Comment";
import { axiosInstance } from "./axiosClient";
import z from "zod";

const CommentSchema = z.object({
  id: z.number(),
  authorId: z.number(),
  username: z.string(),
  content: z.string(),
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

export const getComments = async (
  feedId: number,
  size?: number
): Promise<CommentsResponse | false> => {
  try {
    const res = await axiosInstance.get<CommentsResponse>(
      `api/feeds/${feedId}/comments`,
      {
        params: {
          cursorId: 0,
          size: size ?? 3,
          sort: "LATEST",
        },
      }
    );
    const data = res.data;

    if (isComments(data)) {
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
