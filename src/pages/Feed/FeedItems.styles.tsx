import styled from "styled-components";

export const Cnt = styled.div`
  width: 100%;
`;
export const Content = styled.div`
  margin-top: 8px;
  font-size: 22px;
`;
export const MediaContents = styled.div`
  display: flex;
  // overflow-x: scroll; 스크롤 안생기고 찌그러지게
  height: 100%;
  aspect-ratio: 1/1;
`;
export const MediaContentImageWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
export const MediaContentVideoWrp = styled.div`
  height: 100%;
  overflow: hidden;
  aspect-ratio: 1/1;
`;
export const MediaContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const MediaContentVideo = styled.video`
  height: 100%;
`;
export const Body = styled.div`
  height: 100%;
  background-color: #222;
  color: #eee;
  overflow: hidden;
`;
export const Header = styled.div`
  /* display: flex; */
  padding: 8px 16px;
`;
export const HeaderProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const ProfileImage = styled.img`
  border-radius: 999px;
  height: 32px;
`;
export const Author = styled.div`
  font-size: 18px;
`;
export const Comments = styled.div`
  padding: 8px 16px;
  overflow: hidden;
`;
export const Comment = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
`;
