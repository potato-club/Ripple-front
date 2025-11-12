import styled from "styled-components";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";
import uploadIcon from "../../assets/icons/feed.svg";

const StyledCnt = styled.div`
  height: 100%;
  aspect-ratio: 9 / 19;
  margin: auto;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    aspect-ratio: unset;
  }
`;
const StyledHeader = styled.div`
  flex-shrink: 0;
  height: 85px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 27px;
`;
const StyledUsername = styled.div`
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  & > img {
    width: 42px;
  }
`;
const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const StyledNavbarWrapper = styled.div`
  flex-shrink: 0;
  height: 85px;
  position: relative;
  background: #f4f4f4;
`;
const Upload = () => {
  // 탭 이름 변경
  useEffect(() => {
    document.title = "Ripple | 업로드";
  }, []);

  return (
    <StyledCnt>
      <StyledHeader>
        <StyledUsername>
          <img src={uploadIcon} />
          <span>새 피드 게시하기</span>
        </StyledUsername>
      </StyledHeader>

      <StyledContent>
        Upload
      </StyledContent>

      <StyledNavbarWrapper>
        <Navbar />
      </StyledNavbarWrapper>
    </StyledCnt>
  );
};

export default Upload;
