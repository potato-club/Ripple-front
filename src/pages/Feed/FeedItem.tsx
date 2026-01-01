import type { Feed } from "../../types/Feed";
import { useEffect, useRef, useState } from "react";
import type { Comment } from "../../types/Comment";
import { getComments } from "../../services/Comments/GetComments";
import * as S from "./FeedItems.styles";

export const FeedItem = ({ feed }: { feed: Feed }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false);
  const hasLoadedRef = useRef(false);
  const observerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting && !hasLoadedRef.current) {
          loadComments();
        }
      },
      { threshold: 0.5 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadComments = async () => {
    setIsLoading(true);
    try {
      const res = await getComments(feed.id);
      if (res && res.comments) {
        setComments(res.comments);
        // setHasLoaded(true);
        hasLoadedRef.current = true;
      }
    } catch (err) {
      console.error("Failed to load comments", err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <S.Cnt ref={observerRef}>
      <S.MediaContents>{feed.thumbnailUrl && <S.MediaContentImage src={feed.thumbnailUrl} alt="thumbnail" />}</S.MediaContents>
      <S.Body>
        <S.Header>
          <S.Author>@{feed.author.username}</S.Author>
          <S.Content>{feed.content}</S.Content>
        </S.Header>
        <S.Comments>
          {isLoading
            ? "로딩 중"
            : comments.length === 0
            ? "첫 번째 댓글을 달아보세요"
            : comments.map((comment) => (
                <S.Comment>
                  {comment.author.username}: {comment.content}
                </S.Comment>
              ))}
        </S.Comments>
      </S.Body>
    </S.Cnt>
  );
};
