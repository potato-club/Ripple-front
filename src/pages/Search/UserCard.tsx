import styled from "styled-components";
import profileImagePlaceholderSrc from "../../assets/icons/account.svg";
import { useNavigate } from "react-router";
import { useState } from "react";

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
  isFollowing: boolean;
  onProfileClick: (userId: number) => void;
  onFollow: (userId: number) => void;
  onUnfollow: (userId: number) => void;
}

export const UserCard = ({
  id,
  username,
  profileImageUrl,
  isFollowing,
  onFollow,
  onUnfollow,
}: UserCardProps) => {
  const navigator = useNavigate();
  const [following, setFollowing] = useState(isFollowing);
  return (
    <StyledCnt>
      <StyledHeader onClick={() => navigator(`/${username}`)}>
        <StyledProfileImage
          src={profileImageUrl ?? profileImagePlaceholderSrc}
          alt=""
        />
        <StyledUsername>{username}</StyledUsername>
      </StyledHeader>
      <StyledContent>
        <StyledFollowBtn
          style={following ? { backgroundColor: "#5dda52ff" } : {}}
          onClick={
            following
              ? () => {
                  onUnfollow(id);
                  setFollowing(false);
                }
              : () => {
                  onFollow(id);
                  setFollowing(true);
                }
          }
        >
          {following ? "팔로잉" : "팔로우"}
        </StyledFollowBtn>
      </StyledContent>
    </StyledCnt>
  );
};
