import styled from "styled-components";

export const Cnt = styled.div``;
export const Content = styled.div``;
export const MediaContents = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
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
  height: 100%;
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
export const Author = styled.div``;
export const Comments = styled.div`
  padding: 0 16px;
  overflow: hidden;
`;
export const Comment = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 8px;
`;
