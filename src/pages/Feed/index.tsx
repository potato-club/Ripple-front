import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { useEffect, useRef, useState } from "react";
import type { Feed } from "../../types/Feed";
import rippleIcon from "../../assets/ripple-icon.png";
import directMessageIcon from "../../assets/icons/dm.svg";
import { useNavigate } from "react-router";
import { getUniqueBy } from "../../utils/getUniqueBy";
import { getHomeFeeds } from "../../services/feeds/getHomeFeeds";
import { FeedItem } from "./FeedItem";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { FeedFullscreen } from "./FeedFullscreen";
import type { FeedFullView } from "../../types/FeedFullview";
import { GetFeedFullView } from "../../services/feeds/GetFeedFullView";

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
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
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
const SFeedsWrp = styled.div`
  margin-bottom: 80px;
  margin-top: 70px;
`;
const SNoFeeds = styled.div`
  font-size: 24px;
  color: #eee;
  width: fit-content;
  margin: auto;
  padding-top: 64px;
  padding-bottom: 64px;
`;

const FeedPage = () => {
  const isLoggedIn = useIsLoggedIn();
  const navigate = useNavigate();
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const cursorRef = useRef<null | number>(null);
  const isLoadingRef = useRef(false);
  const noFeedsRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noFeeds, setNoFeeds] = useState<boolean>(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchFeeds = async () => {
    if (isLoadingRef.current || noFeedsRef.current) return;

    isLoadingRef.current = true;
    setIsLoading(true);

    try {
      const res = await getHomeFeeds(cursorRef.current, 3);

      if (res.error) {
        navigate("/login");
      } else if (res.ok && res.response && res.response !== "NoFeeds") {
        cursorRef.current = res.response.nextCursor;
        const newFeeds = res.response.feeds;
        if (newFeeds.length === 0) {
          noFeedsRef.current = true;
          setNoFeeds(true);
          return;
        }
        setFeeds((prev) => getUniqueBy([...prev, ...newFeeds], "id"));
      } else {
        noFeedsRef.current = true;
        setNoFeeds(true);
      }
    } catch (err) {
      console.error("[Feeds]:", err);
    } finally {
      isLoadingRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          !isLoadingRef.current &&
          !noFeedsRef.current &&
          entries[0].isIntersecting
        ) {
          fetchFeeds();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [showingFeedFullscreen, setShowingFeedFullscreen] =
    useState<null | FeedFullView>(null);

  function showFullscreen(id: number) {
    GetFeedFullView(id).then((e) => setShowingFeedFullscreen(e));
  }

  return (
    <SCnt>
      <SBody>
        {showingFeedFullscreen && (
          <FeedFullscreen
            feedFullView={showingFeedFullscreen}
            profileImageUrl={
              feeds.find((e) => e.author.id === showingFeedFullscreen.authorId)
                ?.author.profileImageUrl ?? null
            }
            onExit={() => setShowingFeedFullscreen(null)}
          />
        )}
        <SHeader>
          <SRippleIcon />
          <SDirectMessage />
        </SHeader>
        <SFeedsWrp>
          {feeds.map((feed) => (
            <FeedItem key={feed.id} feed={feed} onClick={showFullscreen} />
          ))}
          <div
            ref={loaderRef}
            style={{ height: "50px", visibility: "hidden" }}
          />
          {isLoading && <SNoFeeds>피드를 불러오는 중...</SNoFeeds>}
          {noFeeds && <SNoFeeds>모든 피드를 시청했습니다.</SNoFeeds>}
        </SFeedsWrp>
      </SBody>
      <Navbar />
    </SCnt>
  );
};

export default FeedPage;
