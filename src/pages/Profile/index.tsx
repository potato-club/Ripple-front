import styled from "styled-components";
import { useParams, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import settingsImg from "../../assets/icons/settings.svg";
import Navbar from "../../components/Navbar";
import { HideScrollbar } from "../../styles/HideScrollbar";
import { FeedCard } from "./FeedCard";
import { ReplyItem } from "./ReplyItem";

const StyledCnt = styled.div`
  height: 100%;
  aspect-ratio: 9 / 19;
  margin: auto;

  background-color: var(--color-bg);
  color: var(--color-text);

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    aspect-ratio: unset;
  }
`;
const StyledHeader = styled.div`
  flex-shrink: 0;
  height: 80px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
`;
const StyledUsername = styled.div`
  font-size: 32px;
  line-height: 32px;
`;
const StyledSettingBtn = styled.img.attrs({ src: settingsImg })`
  height: 32px;
  width: 32px;
  cursor: pointer;
`;
const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const StyledProfileSection = styled.div`
  flex-shrink: 0;
  display: flex;
  height: 124px;
  padding: 0 24px;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
`;
const StyledProfileImage = styled.div<{ img?: string }>`
  background-image: ${(props) =>
    props.img
      ? `url(${props.img})`
      : "url(https://avatar.iran.liara.run/public)"};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  height: 100px;
  min-width: 100px;
  border-radius: 1000px;
`;
const StyledProfileInfoItem = styled.div`
  flex-grow: 1;
  height: 41px;
  text-align: center;
  font-size: 16px;
  line-height: 19px;
  white-space: nowrap;
`;
const StyledScrollAreaOut = styled.div`
  flex: 1;
  overflow-y: auto;
  ${HideScrollbar}
`;
const StyledScrollAreaIn = styled.div`
  height: max-content;
`;
const StyledReplySection = styled.div`
  padding: 16px 24px;
  background-color: #333;
  padding-bottom: 38px;
  border-top: 0.5px solid var(--color-border);
  border-bottom: 0.5px solid var(--color-border);
`;
const StyledRepliesWrapper = styled.div``;
const StyledFeedSection = styled.div`
  padding: 12px 21px;
`;
const StyledFeedWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
`;
const StyledSectionTitle = styled.h2`
  white-space: nowrap;
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 16px;
`;
const StyledNavbarWrapper = styled.div`
  flex-shrink: 0;
  height: 85px;
  position: relative;
`;

interface Reply {
  img: string;
  username: string;
  date: string;
  content: string;
}

const Profile = () => {
  const navigator = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [profileImgSrc, setProfileImgSrc] = useState<string>();
  const [replies] = useState<Reply[]>([
    { username: "asdf", content: "Lorem Ipsum is simply dummy text of the printing and typ", date: "어제", img: "asdf" },
    { username: "asdf", content: "안녕하세요!", date: "어제", img: "asdf" },
  ]);
  const [feeds] = useState([1, 2, 3, 4, 5, 6, 7, 8]);

  const [postCount] = useState(5);
  const [followerCount] = useState(12);
  const [followingCount] = useState(32);

  function getUserInfo(username: string) {
    console.log(`${username}의 정보를 요청합니다.`);
    return {
      displayName: "임시이름",
      profileImgSrc:
        "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
    };
  }

  useEffect(() => {
    if (username) {
      const { displayName, profileImgSrc } = getUserInfo(username);
      setProfileImgSrc(profileImgSrc);

      document.title = displayName
        ? `Ripple | ${displayName}의 프로필`
        : `Ripple | ${username}의 프로필`;
    } else {
      document.title = "Ripple | 알 수 없는 사용자";
    }
  }, [username]);

  return (
    <StyledCnt>
      <StyledHeader>
        <StyledUsername>{username}</StyledUsername>
        <StyledSettingBtn onClick={() => navigator("/settings")} />
      </StyledHeader>

      <StyledContent>
        <StyledProfileSection>
          <StyledProfileImage img={profileImgSrc} />
          <StyledProfileInfoItem>
            게시
            <br />
            {postCount}
          </StyledProfileInfoItem>
          <StyledProfileInfoItem>
            팔로워
            <br />
            {followerCount}
          </StyledProfileInfoItem>
          <StyledProfileInfoItem>
            팔로잉
            <br />
            {followingCount}
          </StyledProfileInfoItem>
        </StyledProfileSection>

        <StyledScrollAreaOut>
          <StyledScrollAreaIn>
            <StyledReplySection>
              <StyledSectionTitle>최근 활동</StyledSectionTitle>
              <StyledRepliesWrapper>
                {replies.map((reply, i) => (
                  <ReplyItem key={i} {...reply} />
                ))}
              </StyledRepliesWrapper>
            </StyledReplySection>

            <StyledFeedSection>
              <StyledSectionTitle>게시한 피드</StyledSectionTitle>
              <StyledFeedWrapper>
                {feeds.map((feed, i) => (
                  <FeedCard key={i} />
                ))}
              </StyledFeedWrapper>
            </StyledFeedSection>
          </StyledScrollAreaIn>
        </StyledScrollAreaOut>
      </StyledContent>

      <StyledNavbarWrapper>
        <Navbar />
      </StyledNavbarWrapper>
    </StyledCnt>
  );
};

export default Profile;
