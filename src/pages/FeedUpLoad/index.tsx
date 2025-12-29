import styled from "styled-components";
import Navbar from "../../components/Navbar";
import uploadimg from "../../assets/icons/upload.svg";

const Cnt = styled.div`
  background-color: #222;
  height: 100%;
  width: 100%;
`;

const StyledHeader = styled.div`
  flex-shrink: 0;
  height: 80px;
  color: white;
  display: flex;
  align-items: center;
  padding: 24px;
`;

const StyledShortcut = styled.img`
  height: 32px;
  width: 32px;
  cursor: pointer;
  margin-right: 20px;
`;

const StyledHeaderTtitle = styled.div`
  font-size: 32px;
  font-weight: bold;
`;


const FeedUpLoadPage = () => {
  return (
    <Cnt>
      <StyledHeader>
        <StyledShortcut src={uploadimg} />
        <StyledHeaderTtitle>업로드</StyledHeaderTtitle>
      </StyledHeader>
      <Navbar />
    </Cnt>
  )
}

export default FeedUpLoadPage;