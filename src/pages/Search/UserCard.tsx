import styled from "styled-components";
import profileImagePlaceholderSrc from "../../assets/icons/account.svg";

const StyledCnt = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  color: white;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0px;
  }
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  height: 64px;
`;
const StyledProfileImage = styled.img`
  /* height: 80%; */
  height: 64px;
  width: 64px;
  border-radius: 50%;
`;
const StyledUsername = styled.div`
  font-size: 16px;
`;
const StyledContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledFollowBtn = styled.div`
  background-color: #1fa6f4;
  border-radius: 12px;
  padding: 4px 20px;
  width: 88px;
  text-align: center;
  font-weight: 500;
`;

interface UserCardProps {
  id: number;
  username: string;
  profileImageUrl: string | null;
  onProfileClick: (userId: number) => void;
  onFollow: (userId: number) => void;
}

export const UserCard = ({
  id,
  username,
  profileImageUrl,
  onFollow,
}: UserCardProps) => {
  return (
    <StyledCnt>
      <StyledHeader>
        <StyledProfileImage
          src={profileImageUrl ?? profileImagePlaceholderSrc}
          alt=""
        />
        <StyledUsername>{username}</StyledUsername>
      </StyledHeader>
      <StyledContent>
        <StyledFollowBtn onClick={() => onFollow(id)}>팔로우</StyledFollowBtn>
      </StyledContent>
    </StyledCnt>
  );
};
