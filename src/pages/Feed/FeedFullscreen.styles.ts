import styled from "styled-components";

export const Cnt = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #222;
  z-index: 999999;
  flex-direction: column;
  color: #eee;
`;
export const Header = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;
export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const UploaderProfile = styled.img`
  height: 64px;
  border-radius: 999px;
`;
export const UploaderName = styled.div`
  font-size: 24px;
`;
export const ExitButton = styled.div`
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  width: 40px;
  height: 40px;
`;
export const MediasOut = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
`;
export const MediasIn = styled.div`
  display: flex;
  height: 100%;
  overflow-y: hidden;
  width: fit-content;
`;
export const MediaItemImg = styled.div`
  height: 100%;
  aspect-ratio: 1;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;
export const MediaItemVid = styled.video``;
export const Content = styled.div`
  background-color: #333;
  padding: 8px 16px;
`;
export const ContentTitle = styled.div`
  font-size: 24px;
`;
export const Comments = styled.div``;
export const NavbarWrp = styled.div``;
