export interface Comment {
  id: number;
  author: {
    id: number;
    username: string;
    profileImageUrl: string | null;
  };
  rootCommentId: number | null;
  replyToUserId: number | null;
  replyToCommentId: number | null;
  content: string | null;
  likeCount: number;
  deleted: boolean;
  createdAt: string;
}
