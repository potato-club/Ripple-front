import styled from "styled-components";
import Navbar from "../../components/Navbar";

import rippleIcon from "../../assets/ripple-icon.png";
import heartIcon from "../../assets/icons/heart.svg";
import dmIcon from "../../assets/icons/dm.svg";
import { FeedItem } from "./FeedItem";
import { useEffect, useRef, useState } from "react";
import { filterDuplicatedObjectByKey } from "../../utils/filterDuplicatedObjectByKey";
import { feedRequest } from "../../services/feedRequest";
import type { Feed } from "../../types/Feed";

const StyledCnt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  /* aspect-ratio: 9 / 19; */
  background-color: #222;
  color: #eee;
`;
const StyledHeader = styled.div`
  height: 80px;
  min-height: 80px;
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
  overflow: hidden;
  width: 100%;
`;
const StyledNavbarWrp = styled.div`
  height: 80px;
`;

function Landing() {
  // 현재까지 받은 모든 피드 저장
  const allFeedsRef = useRef<Feed[]>([]);
  // 현재 렌더링할 피드 상태
  const [showingFeeds, setShowingFeeds] = useState<Feed[]>([]);
  // 현재 피드 스크롤 인덱스
  const [showingFeedIndex, setShowingFeedIndex] = useState(-1);
  // 피드 스크롤 가능 여부 참조 (연속 스크롤 방지)
  const canScrollRef = useRef(true);
  // 피드 스크롤 타임아웃 참조
  const canScrollTimeoutRef = useRef<null | NodeJS.Timeout>(null);

  async function getFeed(): Promise<{ ok: boolean; err?: string }> {
    try {
      const newFeed = await feedRequest();
      const prev = allFeedsRef.current;
      allFeedsRef.current = filterDuplicatedObjectByKey(
        [...prev, newFeed],
        "id"
      );
      return { ok: true };
    } catch (e) {
      return { ok: false, err: String(e) };
    }
  }
  function scrollNext() {
    if (showingFeedIndex < allFeedsRef.current.length) {
      setShowingFeedIndex((prev) => prev + 1);
      console.log("scroll next");
    } else {
      console.warn("scroll next is failed (is last feed)");
    }
  }
  function scrollBack() {
    if (showingFeedIndex > 0) {
      setShowingFeedIndex((prev) => prev - 1);
      console.log("scroll back");
    } else {
      console.warn("scroll back is failed (is first feed)");
    }
  }
  useEffect(() => {
    (async () => {
      // 새 피드 받아오기
      const result = await getFeed();
      showingFeedIndex === -1 && setShowingFeedIndex(0);
    })();
  }, []);

  useEffect(() => {
    // 피드 인덱스 반영
    let copy = showingFeeds;
    copy = allFeedsRef.current.slice(
      Math.max(0, showingFeedIndex - 1),
      showingFeedIndex + 2
    );
    copy = filterDuplicatedObjectByKey(copy, "id");
    setShowingFeeds(copy);
    console.log("피드길이:", copy.length, "| 인덱스:", showingFeedIndex);
  }, [showingFeedIndex]);
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
        onWheel={(e) => {
          if (canScrollRef.current) {
            if (e.nativeEvent.deltaY > 0) {
              scrollNext();
            } else if (e.nativeEvent.deltaY < 0) {
              scrollBack();
            }
          }

          canScrollRef.current = false;
          canScrollTimeoutRef.current &&
            clearTimeout(canScrollTimeoutRef.current);
          canScrollTimeoutRef.current = setTimeout(
            () => (canScrollRef.current = true),
            200 // delay (ms)
          );
        }}
      >
        {showingFeeds.map((e) => (
          <FeedItem key={e.id} feed={e} />
        ))}
      </StyledContent>
      <StyledNavbarWrp>
        <Navbar />
      </StyledNavbarWrp>
    </StyledCnt>
  );
}

export default Landing;
