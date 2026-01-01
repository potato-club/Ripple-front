import { z } from "zod";

export const FeedFullViewSchema = z.object({
  id: z.number(),
  authorId: z.number(),
  authorName: z.string(),
  content: z.string().nullable(),
  tags: z.array(z.string()),
  imageUrls: z.array(z.string()),
  videoHlsUrl: z.string().nullable(),
  videoSourceUrl: z.string().nullable(),
  likeCount: z.number().int().nonnegative(),
  bookmarkCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  viewCount: z.number().int().nonnegative(),
  liked: z.boolean(),
  bookmarked: z.boolean(),
  createdAt: z.string().datetime().or(z.string()), // ISO 포맷 검증 필요 시 .datetime() 추가
});

// 기존의 interface 대용으로 사용 가능
export type FeedFullView = z.infer<typeof FeedFullViewSchema>;
