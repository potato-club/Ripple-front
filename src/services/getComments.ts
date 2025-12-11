import axios from "axios";
import type { Comment } from "../types/Comment";

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

export const getComments = async (): Promise<Comment[] | false> => {
  try {
    // const res = await axios.get<Feed>(
    //   `${import.meta.env.VITE_API_URL}/getComments`
    // );
    // const data = res.data;
    async function getDummyComment(): Promise<Comment> {
      const user = await axios
        .get<RandomUserResponse>("https://randomuser.me/api/")
        .then((res) => res.data);
      const username =
        user.results[0].name.first + " " + user.results[0].name.last;
      const comment: Comment = {
        authorId: Math.floor(Math.random() * 1000000),
        content: await axios
          .get("https://baconipsum.com/api/?type=all-meat&paras=3&format=text")
          .then((res) => res.data),
        id: Math.floor(Math.random() * 1000000),
        username: username,
      };
      return comment;
    }
    const promises = Array(5)
      .fill(0)
      .map(() => getDummyComment());
    const data: Comment[] = await Promise.all(promises);

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
