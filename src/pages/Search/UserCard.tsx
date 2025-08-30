import styled from "styled-components";

const StyledCnt = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
`;
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 64px;
`;
const StyledProfileImage = styled.img`
  height: 80%;
  border-radius: 50%;
`;
const StyledUsername = styled.div``;
const StyledContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledFollowBtn = styled.div`
  background-color: #ccc;
  border-radius: 12px;
  padding: 7px 20px;
`;

interface UserCardProps {
  userId: number;
  username: string;
  profileImage: string;
  onProfileClick: (userId: number) => void;
  onFollow: (userId: number) => void;
}

export const UserCard = ({
  userId,
  username,
  profileImage,
  onFollow,
}: UserCardProps) => {
  return (
    <StyledCnt>
      <StyledHeader>
        <StyledProfileImage src={profileImage} alt="" />
        <StyledUsername>{username}</StyledUsername>
      </StyledHeader>
      <StyledContent>
        <StyledFollowBtn onClick={() => onFollow(userId)}>
          팔로우
        </StyledFollowBtn>
      </StyledContent>
    </StyledCnt>
  );
};
