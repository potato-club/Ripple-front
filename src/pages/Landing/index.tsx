import styled from "styled-components";
import Navbar from "../../components/Navbar";

import rippleIcon from "../../assets/ripple-icon.png";
import heartIcon from "../../assets/icons/heart.svg";
import dmIcon from "../../assets/icons/dm.svg";
import { FeedItem } from "./FeedItem";
import { useEffect, useRef, useState } from "react";
// import { useAuthStore } from "../../stores/useAuthStore";

const SCROLL_FIX_DELAY = 100

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
`;

interface FeedItem {
  id: string;
}

function Landing() {
  // 피드 항목 상태
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  // 스크롤 타이머 참조
  const scrollTimerRef = useRef<number | null>(null);
  // 이전 스크롤 참조
  const prevScroll = useRef<number | null>(null);
  // 액세스 토큰 저장
  // const accessToken = useAuthStore((state) => state.accessToken);
  function getFeeds(): FeedItem[] {
    // ~~피드 요청~~
    return Array(4)
      .fill(0)
      .map(() => ({ id: crypto.randomUUID() }));
  }
  useEffect(() => {
    // 피드 가져오기
    const feeds = getFeeds();
    // 피드 반영 (중복 제거)
    setFeedItems((prev) => [...prev, ...feeds]);

    return () => {
      scrollTimerRef.current !== null && clearTimeout(scrollTimerRef.current);
    };
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
      <StyledContent
        onScroll={(e) => {
          if (e.target instanceof HTMLElement && prevScroll.current === null) {
            prevScroll.current = e.target.scrollTop;
          }
          if (scrollTimerRef.current !== null) {
            clearTimeout(scrollTimerRef.current);
            scrollTimerRef.current = null;
          }
        }}
        onScrollEnd={(e) => {
          scrollTimerRef.current = setTimeout(() => {
            if (e.target instanceof HTMLElement) {
              if (
                prevScroll.current &&
                e.target.scrollTop > prevScroll.current
              ) {
                e.target.scrollTo({
                  behavior: "smooth",
                  top:
                    (Math.floor(
                      (e.target.scrollTop - 1) / e.target.clientHeight
                    ) +
                      1) *
                    e.target.clientHeight,
                });
              } else {
                e.target.scrollTo({
                  behavior: "smooth",
                  top:
                    Math.floor(e.target.scrollTop / e.target.clientHeight) *
                    e.target.clientHeight,
                });
              }
            }
            prevScroll.current = null;
            scrollTimerRef.current = null;
          }, SCROLL_FIX_DELAY);
        }}
      >
        {feedItems.map((e) => (
          <FeedItem key={e.id} id={e.id} />
        ))}
      </StyledContent>
      <StyledNavbarWrp>
        <Navbar />
      </StyledNavbarWrp>
    </StyledCnt>
  );
}

export default Landing;
