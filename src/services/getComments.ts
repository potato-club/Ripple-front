import type { Comment } from "../types/Comment";
import { axiosInstance } from "./axiosClient";

function isComments(arr: any): arr is Comment[] {
  for (const e of arr) {
    if (
      typeof e.id !== "number" ||
      typeof e.authorId !== "number" ||
      typeof e.username !== "string" ||
      typeof e.content !== "string"
    ) {
      return false;
    }
  }

  return true;
}

export const getComments = async (
  feedId: number
): Promise<Comment[] | false> => {
  try {
    const res = await axiosInstance.get<Comment>(
      `${import.meta.env.VITE_API_URL}/feeds/${feedId}/comments`
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
