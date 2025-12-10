export interface FeedDetail {
  id: number;
  authorId: number;
  profileUrl: string;
  username: string;
  content: string;
  mediaUrls: string[];
  isVideo: boolean;
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  createdAt: string;
}
