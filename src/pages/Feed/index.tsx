import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import type { Feed } from "../../types/Feed";
import { getFeed } from "../../services/getFeed";
import rippleIcon from "../../assets/ripple-icon.png";
import directMessageIcon from "../../assets/icons/dm.svg";
import type { Comment } from "../../types/Comment";
import { getComments } from "../../services/getComments";

const SCnt = styled.div`
  background-color: #222;
  height: 100%;
  width: 100%;
`;
const SBody = styled.div`
  background-color: #333;
  overflow-y: scroll;
  height: 100%;
`;
const SHeader = styled.div`
  background-color: #222;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
`;
const SRippleIcon = styled.img.attrs({ src: rippleIcon })`
  height: 100%;
`;
const SDirectMessage = styled.img.attrs({ src: directMessageIcon })`
  height: 70%;
`;
const SFeedsWrp = styled.div``;
const SFeed = styled.div`
  background-color: #333;
  width: 100%;
  aspect-ratio: 2/3;
  border: 1px solid #555;
`;
const SFeedContents = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  aspect-ratio: 1/1;
`;
const SFeedContentImageWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
const SFeedContentVideoWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
const SFeedContentImage = styled.img`
  height: 100%;
`;
const SFeedContentVideo = styled.video`
  height: 100%;
`;
const SFeedBody = styled.div`
  background-color: #222;
  color: #eee;
  overflow: hidden;
`;
const SFeedHeader = styled.div`
  display: flex;
  padding: 8px 16px;
`;
const SFeedAuthor = styled.div``;
const SFeedComments = styled.div`
  padding: 0 16px;
  overflow: hidden;
`;
const SFeedComment = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
`;

const FeedPage = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    (async () => {
      const feed = await getFeed();
      if (feed) setFeeds((prev) => [...prev, feed]);
      else console.error("피드 로드 실패");
      const comments = await getComments();
      if (comments) setComments(comments);
      else console.error("댓글 로드 실패");
    })();
  }, []);
  return (
    <SCnt>
      <SBody>
        <SHeader>
          <SRippleIcon />
          <SDirectMessage />
        </SHeader>
        <SFeedsWrp>
          {feeds.map((feed) => (
            <SFeed key={feed.id}>
              <SFeedContents></SFeedContents>
              <SFeedBody>
                <SFeedHeader>
                  <SFeedAuthor>{feed.username}</SFeedAuthor>
                </SFeedHeader>
                <SFeedComments>
                  {comments.slice(0, 3).map((comment) => (
                    <SFeedComment key={comment.id}>
                      <strong>{comment.username}</strong>: {comment.content}
                    </SFeedComment>
                  ))}
                </SFeedComments>
              </SFeedBody>
            </SFeed>
          ))}
        </SFeedsWrp>
      </SBody>
      <Navbar />
    </SCnt>
  );
};

export default FeedPage;
