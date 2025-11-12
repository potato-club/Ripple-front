import styled from "styled-components";
import Navbar from "../../components/Navbar";
import { ToggleOption } from "./ToggleOption";

import settingsIcon from "../../assets/icons/settings.svg";

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
  justify-content: left;
  padding: 0 32px;
  gap: 16px;
`;
const StyledSettingsItem = styled.img.attrs({ src: settingsIcon, alt: "" })`
  width: 32px;
`;
const StyledHeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 400;
  line-height: 32px;
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
        <StyledSettingsItem />
        <StyledHeaderTitle>설정</StyledHeaderTitle>
      </StyledHeader>
      <StyledContent></StyledContent>
      <StyledNavbarWrp>
        <Navbar />
      </StyledNavbarWrp>
    </StyledCnt>
  );
}

export default Settings;
