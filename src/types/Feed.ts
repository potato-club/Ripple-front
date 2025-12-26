export interface Feed {
  id: number;
  thumbnail: string | null;
  author: {id: number, username: string, profileImageUrl: string | null};
  username: string;
  content: string;
  mediaUrls: string[];
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
}
