import { useNavigate } from "react-router";
import styled from "styled-components";

import homeImg from "../assets/icons/home.svg";
import searchImg from "../assets/icons/search.svg";
import feedImg from "../assets/icons/feed.svg";
import accountImg from "../assets/icons/account.svg";

const StyledCnt = styled.div`
  padding: 10px;
  background-color: #222;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;
const StyledShortcut = styled.img`
  height: 60px;
  cursor: pointer;
`;

/**
 * 래퍼가 다음과 같은 스타일이어야 함:
 * position: relative;
 * height: 100vh;
 */
const Navbar = () => {
  const navigator = useNavigate();
  return (
    <StyledCnt>
      <StyledShortcut src={homeImg} onClick={() => navigator("/")} />
      <StyledShortcut src={searchImg} onClick={() => navigator("/search")} />
      <StyledShortcut src={feedImg} onClick={() => navigator("/upload")} />
      <StyledShortcut src={accountImg} onClick={() => navigator("/username")} />
    </StyledCnt>
  );
};

export default Navbar;
