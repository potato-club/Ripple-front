import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import type { Feed } from "../../types/Feed";
import { getFeed } from "../../services/getFeed";
import rippleIcon from "../../assets/ripple-icon.png";
import directMessageIcon from "../../assets/icons/dm.svg";
import type { Comment } from "../../types/Comment";
import { getComments } from "../../services/getComments";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router";
import { getCookie } from "../../utils/getCookie";

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
const SNoFeeds = styled.div`
  font-size: 24px;
  color: #eee;
  width: fit-content;
  margin: auto;
  margin-top: 64px;
`;

const FeedPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLogIn);
  const checkIsLoggedIn = useAuthStore((state) => state.checkIsLoggedIn);
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({});
  const [noFeeds, setNoFeeds] = useState<boolean>(false);
  useEffect(() => {
    if (!isLoggedIn && checkIsLoggedIn()) {
      navigate("/login");
    }
    (async () => {
      // 피드 로드
      // let feeds = (
      //   await Promise.all(Array.from({ length: 10 }, () => getFeed()))
      // ).filter((feed) => feed !== false);
      const feed = await getFeed();
      console.log(feed);
      if (feed === "NoFeeds") setNoFeeds(true);
      else if (feed) {
        setFeeds((prev) => {const a = [...prev, ...feed.feeds]; console.log(a);return a;});
        setNoFeeds(false);
      }
      // if (feeds) setFeeds((prev) => [...prev, ...feeds]);
      else console.error("피드 로드 실패");

      // 댓글 로드
      feeds.forEach(async (feed) => {
        try {
          const res = await getComments(feed.id);
          if (res) {
            const copy = comments;
            copy[feed.id] = res;
          }
        } catch (err) {
          console.error("댓글 로드 실패: " + err);
        }
      });
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
          {noFeeds ? (
            <SNoFeeds>모든 피드를 시청했습니다.</SNoFeeds>
          ) : (
            feeds.map((feed) => (
              <SFeed key={feed.id}>
                <SFeedContents></SFeedContents>
                <SFeedBody>
                  <SFeedHeader>
                    <SFeedAuthor>{feed.username}</SFeedAuthor>
                  </SFeedHeader>
                  <SFeedComments>
                    {comments[feed.id].slice(0, 3).map((comment) => (
                      <SFeedComment key={comment.id}>
                        <strong>{comment.username}</strong>: {comment.content}
                      </SFeedComment>
                    ))}
                  </SFeedComments>
                </SFeedBody>
              </SFeed>
            ))
          )}
        </SFeedsWrp>
      </SBody>
      <Navbar />
    </SCnt>
  );
};

export default FeedPage;
