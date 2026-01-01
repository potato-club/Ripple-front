import Navbar from "../../components/Navbar";
import type { FeedFullView } from "../../types/FeedFullView";
import * as S from "./FeedFullscreen.styles";
import prf from "../../assets/icons/account.svg";
import close from "../../assets/icons/close.svg";
import { useEffect, useState, useRef } from "react";
import type { Comment } from "../../types/Comment";
import { getComments } from "../../services/Comments/GetComments";
import { PostComments } from "../../services/Comments/PostComments";
import { useMyProfileStore } from "../../stores/useMyProfileStore";
import { useNavigate } from "react-router";

export const FeedFullscreen = ({
  feedFullView,
  profileImageUrl,
  onExit,
}: {
  feedFullView: FeedFullView;
  profileImageUrl: string | null;
  onExit: () => void;
}) => {
  /* 댓글 관련 상태 */
  const [commentResponse, setCommentResponse] = useState<Comment[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  /* 댓글 작성 상태 */
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* 사용자 프로필 */
  const myProfile = useMyProfileStore((state) => state.data);

  const loadComments = async (cursorId?: number) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await getComments(feedFullView.id, cursorId);
      if (!response) {
        setIsLoading(false);
        return;
      }

      if (cursorId) {
        // 무한 스크롤: 기존 댓글에 새로운 댓글 추가
        setCommentResponse((prev) => [...prev, ...response.comments]);
      } else {
        // 초기 로드: 댓글 설정
        setCommentResponse(response.comments);
      }

      setNextCursor(response.nextCursor);
      setHasNext(response.hasNext);
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 댓글 로드
  useEffect(() => {
    loadComments();
  }, [feedFullView.id]);

  // IntersectionObserver 설정
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !isLoading && nextCursor) {
          loadComments(nextCursor);
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNext, isLoading, nextCursor]);

  /* 댓글 작성 핸들러 */
  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await PostComments(feedFullView.id, null, commentText);
      // 새 댓글을 기존 댓글 목록 맨 앞에 추가
      setCommentResponse((prev) => [newComment, ...prev]);
      setCommentText("");
    } catch (error) {
      console.error("댓글 작성 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigator = useNavigate();

  return (
    <S.Cnt>
      <S.Header>
        <S.HeaderLeft onClick={() => navigator(`/${feedFullView.authorName}`)}>
          <S.UploaderProfile src={profileImageUrl ?? prf} alt="profile" />
          <S.UploaderName>@{feedFullView.authorName}</S.UploaderName>
        </S.HeaderLeft>
        <S.ExitButton
          onClick={onExit}
          aria-label="Close"
          style={{ backgroundImage: `url("${close}")` }}
        />
      </S.Header>

      <S.MediasOut>
        <S.MediasIn>
          {feedFullView.imageUrls.map((url, index) => (
            <S.MediaItemImg
              key={index}
              style={{ backgroundImage: `url("${url}")` }}
            />
          ))}
        </S.MediasIn>
      </S.MediasOut>

      <S.Content>
        <S.ContentTitle>{feedFullView.content}</S.ContentTitle>
        <div className="tags">{feedFullView.tags.map((tag) => `#${tag} `)}</div>
      </S.Content>

      <S.CommentInputSection>
        <S.CommentInputWrapper>
          <S.CommentProfileImg
            src={myProfile?.profileImageUrl ?? prf}
            alt="profile"
          />
          <S.CommentInputBox>
            <S.CommentInput
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !isSubmitting) {
                  handleSubmitComment();
                }
              }}
              placeholder="댓글을 입력해주세요..."
              disabled={isSubmitting}
            />
            <S.CommentSubmitButton
              onClick={handleSubmitComment}
              disabled={!commentText.trim() || isSubmitting}
            >
              {isSubmitting ? "작성 중..." : "댓글 작성"}
            </S.CommentSubmitButton>
          </S.CommentInputBox>
        </S.CommentInputWrapper>
      </S.CommentInputSection>

      <S.Comments>
        {commentResponse.length > 0 ? (
          <>
            {commentResponse.map((comment) => (
              <S.CommentItem key={comment.id}>
                <S.CommentItemProfile
                  src={comment.author.profileImageUrl ?? prf}
                  alt={comment.author.username}
                />
                <S.CommentItemContent>
                  <S.CommentItemHeader>
                    <S.CommentItemAuthor>
                      {comment.author.username}
                    </S.CommentItemAuthor>
                    <S.CommentItemDate>
                      {comment.createdAt
                        ? new Date(comment.createdAt).toLocaleDateString()
                        : "방금"}
                    </S.CommentItemDate>
                  </S.CommentItemHeader>
                  <S.CommentItemText>{comment.content}</S.CommentItemText>
                </S.CommentItemContent>
              </S.CommentItem>
            ))}
            <div ref={observerTarget} style={{ height: "1px" }} />
            {isLoading && (
              <div
                style={{ textAlign: "center", padding: "12px", color: "#999" }}
              >
                댓글 로딩 중...
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "20px", color: "#999" }}>
            {feedFullView.commentCount}개의 댓글
          </div>
        )}
      </S.Comments>

      <S.NavbarWrp>
        <Navbar />
      </S.NavbarWrp>
    </S.Cnt>
  );
};
