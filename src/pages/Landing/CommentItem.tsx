import styled from "styled-components";

const StyledCnt = styled.div`
  display: flex;
  gap: 16px;
  max-width: 100%;
  height: 64px;
`;
const StyledLeftBox = styled.div``;
const StyledProfileImage = styled.img.attrs({ alt: "" })`
  width: 48px;
  aspect-ratio: 1;
  border-radius: 50%;
`;
const StyledRightBox = styled.div``;
const StyledRightBoxHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledRightBoxHeaderUsername = styled.div`
  font-size: 16px;
  color: var(--color-text);
`;
const StyledRightBoxHeaderDate = styled.div`
  font-size: 12px;
  color: var(--color-text-gray);
`;
const StyledRightBoxContent = styled.div`
  display: -webkit-box;
  max-height: 48px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CommentItem = ({
  username,
  date,
  content,
  profileUrl,
}: {
  username: string;
  date: string;
  content: string;
  profileUrl: string;
}) => {
  return (
    <StyledCnt>
      <StyledLeftBox>
        <StyledProfileImage src={profileUrl.length === 0 ? "https://placehold.co/400x400" : profileUrl} />
      </StyledLeftBox>
      <StyledRightBox>
        <StyledRightBoxHeader>
          <StyledRightBoxHeaderUsername>
            @{username}
          </StyledRightBoxHeaderUsername>
          <StyledRightBoxHeaderDate>{date}</StyledRightBoxHeaderDate>
        </StyledRightBoxHeader>
        <StyledRightBoxContent>{content}</StyledRightBoxContent>
      </StyledRightBox>
    </StyledCnt>
  );
};
