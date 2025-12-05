export interface Feed {
  id: number;
  authorId: number;
  content: string;
  mediaUrls: string[];
  isVideo: boolean;
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  createdAt: string;
}
