import styled from "styled-components";

import heartIcon from "../../assets/icons/heart.svg";
import { CommentItem } from "./CommentItem";
import { useEffect, useState } from "react";
import type { Feed } from "../../types/Feed";
import placeholderUrl from "../../assets/placeholder.png";
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

interface Comment {
  username: string;
  profileUrl: string;
  content: string;
  date: string;
}

export const FeedItem = ({ feed }: { feed: Feed }) => {
  // const accessToken = useAuthStore((state) => state.accessToken);
  const [comments, setComments] = useState<Comment[]>([]);
  function getComments(): Comment[] {
    // ~~댓글 요청~~~
    return [
      {
        username: "hayo",
        profileUrl: "",
        content: "안녕하세요!",
        date: "1일 전",
      },
      {
        username: "spiderman",
        profileUrl: "",
        content: "여러분의 다정한 이웃 스파이더맨!",
        date: "방금",
      },
      {
        username: "username",
        profileUrl: "",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "1일 전",
      },
      {
        username: "kinderjoy",
        profileUrl: "",
        content: "킨더 조이는 킨더 서프라이즈의 파생형 상품이다.",
        date: "1일 전",
      },
    ];
  }

  useEffect(() => {
    const comments = getComments();
    setComments((prev) => [...prev, ...comments]);
  }, []);

  return (
    <StyledCnt>
      <StyledHeader>
        <StyledHeaderProfileImage />
        <StyledHeaderUsername>@{"username"}</StyledHeaderUsername>
        <StyledHeaderFollowButton>팔로우</StyledHeaderFollowButton>
      </StyledHeader>
      <StyledFeedContentContainer>
        {feed.isVideo ? (
          <StyledFeedContent>
            <StyledFeedContentImage
              src={
                feed.mediaUrls[0].length === 0
                  ? placeholderUrl
                  : feed.mediaUrls[0]
              }
            />
          </StyledFeedContent>
        ) : (
          feed.mediaUrls.map((e, i) => (
            <StyledFeedContent key={e + i}>
              {
                <StyledFeedContentImage
                  key={e + i + "2"}
                  src={e.length === 0 ? placeholderUrl : e}
                />
              }
            </StyledFeedContent>
          ))
        )}
        {}
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
