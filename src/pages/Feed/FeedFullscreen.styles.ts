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
  overflow-y: auto;
  overflow-x: hidden;
`;
export const Header = styled.div`
  display: flex;
  height: 80px;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
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
  flex-shrink: 0;
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
  flex-shrink: 0;
`;
export const ContentTitle = styled.div`
  font-size: 24px;
`;
export const Comments = styled.div`
  padding: 8px 16px;
`;

export const CommentInputSection = styled.div`
  padding: 16px;
  border-bottom: 1px solid #444;
  background-color: #2a2a2a;
  flex-shrink: 0;
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

export const CommentProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const CommentInputBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #333;
  color: #eee;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #0066cc;
    background-color: #3a3a3a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #999;
  }
`;

export const CommentSubmitButton = styled.button`
  padding: 8px 16px;
  background-color: #0066cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #0052a3;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

export const CommentItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #444;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentItemProfile = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const CommentItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const CommentItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const CommentItemAuthor = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #fff;
`;

export const CommentItemDate = styled.span`
  font-size: 12px;
  color: #999;
`;

export const CommentItemText = styled.div`
  font-size: 14px;
  color: #ddd;
  line-height: 1.5;
  word-break: break-word;
`;


export const NavbarWrp = styled.div``;
