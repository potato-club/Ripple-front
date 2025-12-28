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
import { getUniqueBy } from "../../utils/getUniqueBy";
import { axiosInstance } from "../../services/axiosClient";

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
const SFeedContent = styled.div``;
const SFeedMediaContents = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  aspect-ratio: 1/1;
`;
const SFeedMediaContentImageWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
const SFeedMediaContentVideoWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
const SFeedMediaContentImage = styled.img`
  height: 100%;
`;
const SFeedMediaContentVideo = styled.video`
  height: 100%;
`;
const SFeedBody = styled.div`
  background-color: #222;
  color: #eee;
  overflow: hidden;
`;
const SFeedHeader = styled.div`
  /* display: flex; */
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

type Comments = Record<string, Comment[]>;

const FeedPage = () => {
  const isLoggedIn = useAuthStore((state) => state.isLogIn);
  const checkIsLoggedIn = useAuthStore((state) => state.checkIsLoggedIn);
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [comments, setComments] = useState<Comments>({});
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
      const res = await getFeed();
      if (res.ok && res.response !== undefined) {
        if (res.response === "NoFeeds") {
          setNoFeeds(true);
          console.warn("No more feeds.");
        } else {
          const feedsResponse = res.response.feeds;
          setNoFeeds(false);
          setFeeds((prev) => {
            const newFeeds = [...prev, ...feedsResponse];
            const newFeedsFiltered = getUniqueBy(newFeeds, "id");
            return newFeedsFiltered;
          });
        }
      } else {
        console.error("Failed to load feeds.");
      }

      // // 댓글 로드
      // feeds.forEach(async (feed) => {
      //   try {
      //     const res = await getComments(feed.id);
      //     if (res) {
      //       const copy = comments ?? {};
      //       copy[feed.id] = res;
      //     }
      //   } catch (err) {
      //     console.error("댓글 로드 실패: " + err);
      //   }
      // });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const prevComments = { ...comments };
      for (const feed of feeds) {
        if (!comments[feed.id]) {
          const res = await getComments(feed.id);
          if (res && res.comments) {
            prevComments[feed.id] = res.comments;
          }
        }
      }
      setComments(prevComments);
    })();
  }, [feeds]);
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
                <SFeedMediaContents></SFeedMediaContents>
                <SFeedBody>
                  <SFeedHeader>
                    <SFeedAuthor>@{feed.author.username}</SFeedAuthor>
                    <SFeedContent>{feed.content}</SFeedContent>
                  </SFeedHeader>
                  <SFeedComments>
                    {comments[feed.id] !== undefined
                      ? comments[feed.id].length !== 0
                        ? comments[feed.id].slice(0, 3).map((comment) => (
                            <SFeedComment key={comment.id}>
                              <strong>{comment.username}</strong>:{" "}
                              {comment.content}
                            </SFeedComment>
                          ))
                        : "첫 번째 댓글을 달아보세요!"
                      : null}
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
