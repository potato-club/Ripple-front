import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import type { Feed } from "../../types/Feed";
import { getFeed } from "../../services/getFeed";

const SCnt = styled.div`
  background-color: #222;
  height: 100%;
`;
const SBody = styled.div`
  background-color: #333;
  height: 100%;
`;
const SHeader = styled.div``;
const SRippleIcon = styled.img``;
const SDirectMessage = styled.img``;
const SFeedsWrp = styled.div``;
const SFeed = styled.div``;

const FeedPage = () => {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  useEffect(() => {
    (async () => {
      const feed = await getFeed();
      if (feed) setFeeds((prev) => [...prev, feed]);
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
            <SFeed key={feed.id}></SFeed>
          ))}
        </SFeedsWrp>
      </SBody>
      <Navbar />
    </SCnt>
  );
};

export default FeedPage;
