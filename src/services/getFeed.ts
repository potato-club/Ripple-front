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

interface UserProfile {
  gender: "male" | "female";
  name: { first: string; last: string; title: string };
  location: string;
  email: string;
  login: string;
  dob: string; // 생일 정보
  registered: string; // 등록일 정보
  phone: string;
  cell: string;
  id: string; // 국가 ID (예: PPS)
  picture: string;
  nat: string; // 국적 (예: IE)
}

interface RandomUserResponse {
  results: UserProfile[];
  info: never;
}

export const getFeed = async (): Promise<Feed | false> => {
  try {
    // const res = await axios.get<Feed>(
    //   `${import.meta.env.VITE_API_URL}/getFeed`
    // );
    // const data = res.data;
    async function getDummyFeed(): Promise<Feed> {
      const user = await axios
        .get<RandomUserResponse>("https://randomuser.me/api/")
        .then((res) => res.data);
      const username =
        user.results[0].name.first + " " + user.results[0].name.last;
      const feed: Feed = {
        authorId: Math.floor(Math.random() * 1000000),
        content: await axios
          .get("https://baconipsum.com/api/?type=all-meat&paras=3&format=text")
          .then((res) => res.data),
        id: Math.floor(Math.random() * 1000000),
        username: username,
        mediaUrls: [],
        tags: [],
        likeCount: Math.floor(Math.random() * 1000),
        bookmarkCount: Math.floor(Math.random() * 500),
        createdAt: new Date().toISOString(),
      };
      return feed;
    }
    const data: Feed = await getDummyFeed();

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
