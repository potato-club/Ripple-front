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
  overflow: scroll;
  width: 100%;
`;
const StyledNavbarWrp = styled.div`
  height: 80px;
`;

function Landing() {
  // 현재까지 받은 모든 피드 저장
  const [allFeedsState, setAllFeedsState] = useState<Feed[]>([]);

  async function getFeed(): Promise<{ ok: boolean; err?: string }> {
    try {
      const newFeed = await feedRequest();
      const prev = allFeedsState;
      setAllFeedsState(filterDuplicatedObjectByKey([...prev, newFeed], "id"));
      return { ok: true };
    } catch (e) {
      return { ok: false, err: String(e) };
    }
  }
  useEffect(() => {
    (async () => {
      // 새 피드 받아오기
      const result = await getFeed();
      if (!result.ok) {
        console.error(result.err);
      }
    })();
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
        {allFeedsState.map((e) => (
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
