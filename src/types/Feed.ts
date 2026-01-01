import type { Author } from "./Author";
import type { FeedStatus } from "./FeedStatus";
import type { visibilityType } from "./Visibility";
export interface Feed {
  id: number;
  author: Author;
  content: string|null;
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  viewCount: number;
  thumbnailUrl: string | null;
  feedStatus: FeedStatus;
  visibility: visibilityType;
  createdAt: string;
}
