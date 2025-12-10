import styled from "styled-components";

import heartIcon from "../../assets/icons/heart.svg";
import { CommentItem } from "./CommentItem";
import { useEffect, useState } from "react";
import type { Feed } from "../../types/Feed";
import placeholderUrl from "../../assets/placeholder.png";
import { commentsRequest } from "../../services/commentsRequest";
import type { Comment } from "../../types/Comment";
// import { useAuthStore } from "../../stores/useAuthStore";

const StyledCnt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  color: var(--color-text);
`;
const StyledHeader = styled.div`
  display: flex;
  height: 60px;
  padding: 6px 8px;
  align-items: center;
  gap: 8px;
`;
const StyledHeaderProfileImage = styled.img`
  background: #fff;
  height: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
`;
const StyledHeaderUsername = styled.p`
  flex-grow: 1;
  font-size: 24px;
`;
const StyledHeaderFollowButton = styled.button`
  margin-right: 8px;
  background-color: var(--color-primary);
  width: 88px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-radius: 11px;
  color: white;
  font-size: 16px;
`;
const StyledFeedContentContainer = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-color: #fff;
  display: flex;
  white-space: nowrap;
  overflow: hidden;
  overflow-x: scroll;
`;
const StyledFeedContent = styled.div`
  overflow: hidden;
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  flex: 0 0 auto;
`;
const StyledFeedContentImage = styled.img`
  /* 이미지 비율이 1:1이 아닐 경우 높이에 맞춤 */
  /* width: 100%; */
  height: 100%;
`;
const StyledFeedContentVideo = styled.video`
  /* 비디오 비율이 1:1이 아닐 경우 높이에 맞춤 */
  /* width: 100%; */
  height: 100%;
`;
const StyledDetailContainer = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const StyledDetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
`;
const StyledDetailHeaderLeftBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const StyledCommentButton = styled.button`
  background: none;
  color: var(--color-text);
  font-size: 24px;
`;
const StyledLikeButton = styled.img.attrs({ src: heartIcon, alt: "" })`
  width: 32px;
`;
const StyledShareButton = styled.button`
  background: none;
  color: var(--color-text);
  font-size: 24px;
`;
const StyledBestCommentsContainer = styled.div`
  padding: 0 16px;
  width: 100%;
`;

export const FeedItem = ({
  feed,
  onClick,
}: {
  feed: Feed;
  onClick: () => void;
}) => {
  // const accessToken = useAuthStore((state) => state.accessToken);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    (async () => {
      const comments = await commentsRequest();
      setComments((prev) => [...prev, ...comments]);
    })();
  }, []);

  return (
    <StyledCnt onClick={onClick}>
      <StyledHeader>
        <StyledHeaderProfileImage />
        <StyledHeaderUsername>@{"username"}</StyledHeaderUsername>
        <StyledHeaderFollowButton>팔로우</StyledHeaderFollowButton>
      </StyledHeader>
      <StyledFeedContentContainer>
        <StyledFeedContent>
          <StyledFeedContentImage
            src={feed.thumbnail.length === 0 ? placeholderUrl : feed.thumbnail}
          />
        </StyledFeedContent>
      </StyledFeedContentContainer>
      <StyledDetailContainer>
        <StyledDetailHeader>
          <StyledDetailHeaderLeftBox>
            <StyledLikeButton />
            <StyledShareButton>공유</StyledShareButton>
          </StyledDetailHeaderLeftBox>
          <StyledCommentButton>댓글</StyledCommentButton>
        </StyledDetailHeader>
        <StyledBestCommentsContainer>
          {comments.length <= 2
            ? comments.map((e) => <CommentItem key={e.username} {...e} />)
            : comments
                .slice(0, 2)
                .map((e) => <CommentItem key={e.username} {...e} />)}
        </StyledBestCommentsContainer>
      </StyledDetailContainer>
    </StyledCnt>
  );
};
