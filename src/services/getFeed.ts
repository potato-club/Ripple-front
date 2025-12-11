import axios from "axios";
import type { Feed } from "../types/Feed";

function isFeed(obj: any): obj is Feed {
  const isMediaUrlsValid =
    Array.isArray(obj.mediaUrls) &&
    obj.mediaUrls.every((url: any) => typeof url === "string");

  const isTagsValid =
    Array.isArray(obj.tags) &&
    obj.tags.every((tag: any) => typeof tag === "string");

  const isScalarFieldsValid =
    typeof obj.id === "number" &&
    typeof obj.authorId === "number" &&
    typeof obj.username === "string" &&
    typeof obj.content === "string" &&
    typeof obj.likeCount === "number" &&
    typeof obj.bookmarkCount === "number" &&
    typeof obj.createdAt === "string";

  return isScalarFieldsValid && isMediaUrlsValid && isTagsValid;
}

export const getFeed = async (): Promise<Feed | false> => {
  try {
    // const res = await axios.get<Feed>(
    //   `${import.meta.env.VITE_API_URL}/getFeed`
    // );
    // const data = res.data;
    const data: Feed = {
      authorId: 1,
      bookmarkCount: 1,
      content: "",
      createdAt: "",
      id: Math.random(),
      likeCount: 1,
      mediaUrls: [],
      tags: [],
      username: "",
    };

    if (isFeed(data)) {
      return data;
    } else {
      console.error("API 응답이 예상되는 Feed 구조와 일치하지 않습니다.", data);
      return false;
    }
  } catch (error) {
    console.error("피드를 불러오는 중 오류 발생:", error);
    return false;
  }
};
