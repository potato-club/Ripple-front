import styled from "styled-components";
import { feedDetailRequest } from "../../services/feedDetailRequest";
import { useEffect, useState } from "react";
import type { FeedDetail } from "../../types/FeedDetail";
import { profileImageRequest } from "../../services/profileImageRequest";
import { usernameRequest } from "../../services/usernameRequest";
import heartIcon from "../../assets/icons/heart.svg";
import { commentsRequest } from "../../services/commentsRequest";
import type { Comment } from "../../types/Comment";
import { CommentItem } from "./CommentItem";
import sendIcon from "../../assets/icons/send.svg";

const SCntWrp = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
`;
const SCnt = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const SHeader = styled.div`
  height: 70px;
  min-height: 70px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
const SHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const SProfileImageWrp = styled.div`
  overflow: hidden;
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;
const SProfileImage = styled.img``;
const SAuthorUsername = styled.div`
  font-size: 22px;
`;
const SFollowButton = styled.button`
  background-color: var(--color-primary);
  padding: 8px 22px;
  color: #fff;
  border-radius: 12px;
`;
const SContents = styled.div`
  display: flex;
  overflow-x: scroll;
  aspect-ratio: 1;
`;
const SContentImageWrp = styled.div``;
const SContentImage = styled.img`
  height: 100%;
`;
const SContentVideoWrp = styled.div``;
const SContentVideo = styled.video`
  height: 100%;
`;
const SDetails = styled.div`
  max-height: 300px;
  background-color: #222;
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const SDetailsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const SLikeButton = styled.img.attrs({ src: heartIcon, alt: "" })`
  width: 32px;
`;
const SCommentsWrp = styled.div`
  overflow: scroll;
  flex-grow: 1;
  height: 180px;
`;
const SCommentInputWrp = styled.div`
  position: relative;
`;
const SCommentInput = styled.input.attrs({
  type: "text",
  placeholder: "댓글을 입력하세요",
})`
  padding: 4px 8px;
  border-radius: 50px;
  background-color: #333;
  width: 100%;
  color: white;
  &:focus {
    outline: none;
  }
`;
const SCommentSendButton = styled.button`
  background: none;
  background-image: url("${sendIcon}");
  background-repeat: no-repeat;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 0px;
  right: -20px;
`;

export const Fullscreen = ({
  feedId,
  authorId,
  isVideo,
}: {
  feedId: number;
  authorId: number;
  isVideo: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feed, setFeed] = useState<FeedDetail>();
  const [profileImage, setProfileImage] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    (async () => {
      const feed = await feedDetailRequest(feedId);
      setFeed(feed);
      const profileUrl = await profileImageRequest(authorId);
      setProfileImage(profileUrl);
      const username = await usernameRequest(authorId);
      setUsername(username);
      const comments = await commentsRequest();
      setComments(comments);
      setIsLoading(false);
    })();
  }, []);
  return (
    <SCntWrp>
      <SCnt>
        <SHeader>
          <SHeaderLeft>
            <SProfileImageWrp>
              <SProfileImage src={profileImage} />
            </SProfileImageWrp>
            <SAuthorUsername>@{username}</SAuthorUsername>
          </SHeaderLeft>
          <SFollowButton>팔로우</SFollowButton>
        </SHeader>
        <SContents>
          {isLoading ? (
            "loading"
          ) : isVideo ? (
            <SContentVideoWrp>
              <SContentVideo src={feed?.mediaUrls[0]} />
            </SContentVideoWrp>
          ) : (
            feed?.mediaUrls.map((url, i) => (
              <SContentImageWrp key={i}>
                <SContentImage src={url} />
              </SContentImageWrp>
            ))
          )}
        </SContents>
        <SDetails>
          <SDetailsHeader>
            <SLikeButton></SLikeButton>
          </SDetailsHeader>
          <SCommentsWrp>
            {comments.map((comment) => (
              <CommentItem
                key={comment.date + comment.content + comment.username}
                content={comment.content}
                date={comment.date}
                profileUrl={comment.profileUrl}
                username={comment.username}
              />
            ))}
          </SCommentsWrp>
          <SCommentInputWrp>
            <SCommentInput />
            <SCommentSendButton />
          </SCommentInputWrp>
        </SDetails>
      </SCnt>
    </SCntWrp>
  );
};
