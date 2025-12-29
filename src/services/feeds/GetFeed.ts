import z from "zod";
import { axiosInstance } from "../axiosClient";
import { AxiosError } from "axios";

const FeedSchema = z.object({
  id: z.number(),
  thumbnail: z.string().nullable(),
  author: z.object({
    id: z.number(),
    username: z.string(),
    profileImageUrl: z.string().nullable(),
  }),
  content: z.string().nullable(),
  mediaUrls: z.array(z.string()),
  tags: z.array(z.string()),
  likeCount: z.number(),
  bookmarkCount: z.number(),
  commentCount: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  viewCount: z.number(),
  visibility: z.enum(["PUBLIC"]),
  feedStatus: z.enum(["PUBLISHED"]),
});

const ResponseSchema = z.object({
  feeds: z.array(FeedSchema),
  nextCursor: z.number().nullable(),
  hasNext: z.boolean().nullable(),
});

type FeedResponse = z.infer<typeof ResponseSchema>;

function isValidResponse(obj: any): obj is FeedResponse {
  const result = ResponseSchema.safeParse(obj);
  if (result.success) return true;

  console.error("Zod Validation Error:", result.error.format());
  return false;
}

export const getFeed = async (): Promise<{
  ok: boolean;
  response?: FeedResponse | "NoFeeds";
}> => {
  const attempt = async (
    attemptCount = 0
  ): Promise<{
    ok: boolean;
    response?: FeedResponse | "NoFeeds";
    error?: AxiosError;
  }> => {
    try {
      const res = await axiosInstance.get("/api/feeds/home", {
        params: { cursor: null, limit: 10 },
      });

      // !!! ------- 임시 오타 교정 ------- !!! //
      const rawData = res.data;
      const normalizedData = {
        ...rawData,
        hasNext: rawData.hasNext ?? rawData.hasNest ?? null,
      };
      console.log("응답:", rawData, normalizedData);
      // !!! ------- 임시 오타 교정 ------- !!! //

      if (isValidResponse(normalizedData)) {
        if (normalizedData.feeds.length === 0) {
          return { ok: true, response: "NoFeeds" };
        }
        return { ok: true, response: normalizedData };
      }

      return { ok: false };
    } catch (error) {
      if (error instanceof AxiosError && error.status === 401)
        return { ok: false, error: error };
      if (attemptCount < 3) {
        console.warn(`재시도 중... (${attemptCount + 1}/3)`);
        return await attempt(attemptCount + 1);
      }
      return { ok: false };
    }
  };

  return await attempt();
};
