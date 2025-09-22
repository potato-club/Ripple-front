import styled from "styled-components";
import Navbar from "../../components/Navbar";

import rippleIcon from "../../assets/ripple-icon.png";
import heartIcon from "../../assets/icons/heart.svg";
import dmIcon from "../../assets/icons/dm.svg";
import { FeedItem } from "./FeedItem";
import { useEffect, useState } from "react";
// import { useAuthStore } from "../../stores/useAuthStore";

const StyledCnt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  aspect-ratio: 9 / 19;
  background-color: #222;
  color: #eee;
`;
const StyledHeader = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;
const StyledHeaderRightShortcutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 16px;
`;
const StyledRippleIcon = styled.img.attrs({ src: rippleIcon, alt: "" })`
  height: 64px;
`;
const StyledHeaderRightShortcutIcon = styled.img.attrs({ alt: "" })`
  height: 32px;
`;
const StyledContent = styled.div`
  flex-grow: 1;
  overflow: scroll;
  width: 100%;
`;
const StyledNavbarWrp = styled.div`
  height: 80px;
  min-height: 80px;
`;

interface FeedItem {
  id: string;
}

function Landing() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  // const accessToken = useAuthStore((state) => state.accessToken);
  function getFeeds(): FeedItem[] {
    // ~~피드 요청~~
    return [{ id: "0" }, { id: "1" }, { id: "2" }];
  }
  useEffect(() => {
    const feeds = getFeeds();
    setFeedItems((prev) => [...prev, ...feeds]);
  }, []);
  return (
    <StyledCnt>
      <StyledHeader>
        <StyledRippleIcon />
        <StyledHeaderRightShortcutWrapper>
          <StyledHeaderRightShortcutIcon src={heartIcon} />
          <StyledHeaderRightShortcutIcon src={dmIcon} />
        </StyledHeaderRightShortcutWrapper>
      </StyledHeader>
      <StyledContent>
        {feedItems.map((e) => (
          <FeedItem key={e.id} id={e.id} />
        ))}
      </StyledContent>
      <StyledNavbarWrp className="asdf">
        <Navbar />
      </StyledNavbarWrp>
    </StyledCnt>
  );
}

export default Landing;
