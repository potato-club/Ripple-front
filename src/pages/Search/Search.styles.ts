import styled from "styled-components";
import { HideScrollbar } from "../../styles/HideScrollbar";

export const Cnt = styled.div`
  height: 100%;
  /* aspect-ratio: 9 / 19; */
  /* margin: auto; */

  display: flex;
  flex-direction: column;

  background-color: #222;

  /* @media (max-width: 768px) {
    aspect-ratio: unset;
  } */
`;
export const Header = styled.div`
  flex-shrink: 0;
  height: 80px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 27px;
`;
export const Username = styled.div`
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
export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
export const SearchSection = styled.div`
  flex-shrink: 0;
  display: flex;
  padding: 16px 21px;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
`;
export const SearchInput = styled.input.attrs({
  type: "text",
  placeholder: "검색어를 입력하세요",
})`
  width: 100%;
  background: #333;
  border: none;
  padding: 12px 12px 11px;
  color: #eee;
  &:focus {
    outline: none;
  }
`;
export const ScrollAreaOut = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 22px;
  ${HideScrollbar}
`;
export const ScrollAreaIn = styled.div`
  height: max-content;
  padding-top: 24px;
`;
export const NavbarWrapper = styled.div`
  flex-shrink: 0;
  position: relative;
`;

export const NoResult = styled.p`
  color: #ccc;
  font-size: 16px;
  text-align: center;
  margin-top: 50%;
`;
