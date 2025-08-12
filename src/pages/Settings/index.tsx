import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { ToggleOption } from "./ToggleOption";

const StyledCnt = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  aspect-ratio: 9 / 19;
`;
const StyledHeader = styled.div`
  background-color: #222;
  height: 85px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  padding: 0 27px;
  font-size: 32px;
`;
const StyledContent = styled.div`
  flex-grow: 1;
  padding: 10px 20px;
  overflow: scroll;
`;
const StyledNavbarWrp = styled.div`
  height: 80px;
`;
const StyledSection = styled.div`
  border-bottom: 1px solid #ccc;
  margin-bottom: 20px;
  padding-bottom: 20px;
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;
const StyledSectionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

function Settings() {
  return (
    <StyledCnt>
      <StyledHeader>
        <span>Settings</span>
      </StyledHeader>
      <StyledContent>
        <StyledSection>
          <StyledSectionTitle>설정 섹션</StyledSectionTitle>
          <ToggleOption name="토글 옵션" checked={false} />
        </StyledSection>
      </StyledContent>
      <StyledNavbarWrp>
        <Navbar />
      </StyledNavbarWrp>
    </StyledCnt>
  );
}

export default Settings;
