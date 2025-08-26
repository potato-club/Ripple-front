import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  &:last-child {
    margin-bottom: 0;
  }
`;
const StyledLeftContainer = styled.div``;
const StyledRightContainer = styled.div``;
const StyledRightUpperSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;
const StyledRightLowerSection = styled.div``;
const StyledProfileImageWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  overflow: hidden;
  background-color: #fff;
`;
const StyledProfileImage = styled.img.attrs({ alt: "" })`
  aspect-ratio: 1;
`;
const StyledUsername = styled.div`
  color: var(--color-text);
`;
const StyledDate = styled.div`
  color: var(--color-text-gray);
  font-size: 12px;
`;

export function ReplyItem({
  img,
  username,
  date,
  content,
}: {
  img: string;
  username: string;
  date: string;
  content: string;
}) {
  img;
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <StyledProfileImageWrapper>
          <StyledProfileImage src={img} />
        </StyledProfileImageWrapper>
      </StyledLeftContainer>
      <StyledRightContainer>
        <StyledRightUpperSection>
          <StyledUsername>@{username}</StyledUsername>
          <StyledDate>{date}</StyledDate>
        </StyledRightUpperSection>
        <StyledRightLowerSection>{content}</StyledRightLowerSection>
      </StyledRightContainer>
    </StyledContainer>
  );
}
