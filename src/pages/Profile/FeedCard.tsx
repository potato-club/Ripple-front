import styled from "styled-components";
import type { Feed } from "../../types/Feed";

const StyledCnt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  aspect-ratio: 1 / 1;
  overflow: hidden;
`;
const StyledThumbnail = styled.img`
  width: 100%;
  background-color: #222;
  color: white;
`;

export const FeedCard = ({ feed }: { feed: Feed }) => {
  return (
    <StyledCnt>
      <StyledThumbnail src="https://picsum.photos/500/500" />
    </StyledCnt>
  );
};
