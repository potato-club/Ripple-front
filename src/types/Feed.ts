export interface Feed {
  id: number;
  authorId: number;
  username: string;
  content: string;
  mediaUrls: string[];
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  createdAt: string;
}
