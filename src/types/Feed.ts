export interface Feed {
  id: number;
  authorId: number;
  profileUrl: string;
  username: string;
  content: string;
  thumbnail: string;
  isVideo: boolean;
  tags: string[];
  likeCount: number;
  bookmarkCount: number;
  createdAt: string;
}
