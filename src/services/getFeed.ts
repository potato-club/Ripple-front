import { AxiosError } from "axios";
import type { Feed } from "../types/Feed";
import { getCookie } from "../utils/getCookie";
import z from "zod";
import { refreshToken } from "./Auth/refreshToken";
import { axiosInstance } from "./axiosClient";



const FeedSchema = z.object({
  id: z.number(),
  thumbnail: z.string().nullable(),
  author: z.object({id: z.number(), username: z.string(), profileImageUrl: z.string().nullable()}),
  username: z.string(),
  content: z.string(),
  mediaUrls: z.array(z.string()),
  tags: z.array(z.string()),
  likeCount: z.number(),
  bookmarkCount: z.number(),
  commentCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  viewCount: z.number()
});

const ResponseSchema = z.object({
  feeds: z.array(FeedSchema),
  nextCursor: z.number(),
  hasNext: z.boolean(),
});

type Response = z.infer<typeof ResponseSchema>;

function isFeed(obj: any): obj is Feed {
  return ResponseSchema.safeParse(obj).success;
}

export const getFeed = async (): Promise<Response | false | "NoFeeds"> => {
  const attempt = async (attemptCount = 0) => {
    if (attemptCount > 3) return false;
    const res = await axiosInstance.get<Response>("/api/feeds/home", {
      params: { cursor: null, limit: 10 },
    });
    if (res && isFeed(res.data)) {
      return res.data;
    } else {
      console.log(res.data)
      if (Array.isArray(res.data.feeds) && res.data.feeds.length === 0) return "NoFeeds";
      console.error("예상하지 못한 피드 데이터 구조:", res.data);
      return false;
    }
  };

  return await attempt();
  // const attempt = async (attemptCount = 0) => {
  //   if (!(attemptCount < 3)) return false;
  //   try {
  //     const res = await axiosInstance.get<Response>(
  //       `${import.meta.env.VITE_API_URL}/api/feeds/home`,
  //       {
  //         params: { cursor: 0, limit: 10 },
  //         headers: {
  //           Authorization: `Bearer ${getCookie(
  //             import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN
  //           )}`,
  //         },
  //       }
  //     );
  //     const data = res.data;

  //     if (isFeed(data)) {
  //       return data;
  //     } else {
  //       console.error(
  //         "API 응답이 예상되는 Feed 구조와 일치하지 않습니다.",
  //         data
  //       );
  //       return false;
  //     }
  //   } catch (error) {
  //     if (error instanceof AxiosError) {
  //       // Unauthorized error
  //       if (error.status === 401) {
  //         console.log("[JWT] Refresh..");
  //         const tryRefresh = async (tryCount = 0) => {
  //           if (await refreshToken()) {
  //             console.log("[JWT] Refresh Complete!");
  //             attempt(attemptCount + 1);
  //           } else if (tryCount < 3) {
  //             await tryRefresh(tryCount + 1);
  //           }
  //         };
  //         await tryRefresh();
  //       }
  //     } else console.error("[Feed] Unexpected Exception:", error);
  //     return false;
  //   }
  // };

  // await attempt();

  // return false;
};
