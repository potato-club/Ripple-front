import type { Author } from "./Author";

export interface Feed {
  id: number;
  thumbnail: string | null;
  author: Author;
  content: string | null;
  feedStatus: "PUBLISHED";
  visibility: "PUBLIC";
  mediaUrls: string[];
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}
