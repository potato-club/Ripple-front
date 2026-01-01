import styled from "styled-components";
import { useParams, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import settingsImg from "../../assets/icons/settings.svg";
import Navbar from "../../components/Navbar";
import { HideScrollbar } from "../../styles/HideScrollbar";
import { FeedCard } from "./FeedCard";
import { ReplyItem } from "./ReplyItem";
import { getProfileByUsername } from "../../services/User/getProfileByUsername";
import type { Comment } from "../../types/Comment";
import noProfileImageSrc from "../../assets/icons/account.svg";
import { PresignProfileImage } from "../../services/User/PresignProfileImage";
import { uploadProfileImage } from "../../services/User/uploadProfileImage";
import { patchProfile } from "../../services/User/patchProfile";
import getImageSize from "../../utils/getImageSize";
import profilePlaceholder from "../../assets/icons/account.svg";
import type { Feed } from "../../types/Feed";
import { resizeImage } from "../../utils/resizeImage";
import { clearProfile } from "../../services/User/clearProfile";

const StyledCnt = styled.div`
  height: 100%;
  margin: auto;

  background-color: var(--color-bg);
  color: var(--color-text);

  display: flex;
  flex-direction: column;
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
const StyledProfileImage = styled.div<{ $img: string }>`
  background-image: ${(props) => `url("${props.$img}")`};
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
const StyledUserNotFound = styled.div`
  flex-grow: 1;
  font-size: 24px;
  text-align: center;
  padding-top: 64px;
`;
// Upload profile image modal
const SUpdateProfileImageModal = styled.div`
  background: #000000a0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;
const SUpdateProfileImageModalIn = styled.div`
  background-color: var(--color-bg);
  width: 80%;
  height: 500px;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  padding: 16px 24px 24px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const SUpdateProfileImageModalTitle = styled.h1`
  color: #eee;
  font-size: 24px;
`;
const SUpdateProfileImageModalInputDisplay = styled.div`
  background: #333;
  width: 95%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const SUpdateProfileImageModalInput = styled.input.attrs({ type: "file" })`
  display: none;
`;
const SUpdateProfileImageModalInputSubmitButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 8px;
`;
const SUpdateProfileImageModalInputSubmitButton = styled.button`
  background-color: var(--color-primary);
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  flex-grow: 1;
  font-weight: 500;
`;
const SUpdateProfileImageModalInputSubmitButtonRemove = styled.button`
  background-color: #d15a5aff;
  border-radius: 8px;
  padding: 8px;
  color: #fff;
  flex-grow: 1;
  font-weight: 500;
`;

const Profile = () => {
  const navigator = useNavigate();

  const [userNotFound, setUserNotFound] = useState(false);

  const { username } = useParams<{ username: string }>();
  const [profileImgSrc, setProfileImgSrc] = useState<string | null>();
  const [comments] = useState<Comment[]>([]);
  const [feeds, setFeeds] = useState<Feed[]>([]);

  const [postCount, setPostCount] = useState(0);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [updateProfileImagePreview, setUpdateProfileImagePreview] =
    useState<File | null>(null);

  async function getUserProfile(username: string) {
    // const myProfile = await getMyProfile();
    const userProfile = await getProfileByUsername(username);
    if (!userProfile) {
      console.error("Failed to get profile");
      return false;
    }
    return userProfile;
  }

  useEffect(() => {
    if (username) {
      (async () => {
        const userProfile = await getUserProfile(username);
        if (!userProfile) {
          setUserNotFound(true);
          document.title = "Ripple | 알 수 없는 사용자";
          return;
        }
        setProfileImgSrc(userProfile.profileImageUrl);
        setPostCount(userProfile.postCount);
        setFollowerCount(userProfile.followerCount);
        setFollowingCount(userProfile.followingCount);

        document.title = `Ripple | ${userProfile.username}의 프로필`;
      })();
    } else {
      setUserNotFound(true);
      document.title = "Ripple | 알 수 없는 사용자";
    }
  }, [username]);

  // 프로필이미지 바꾸기
  async function updateProfileImage() {
    const input = updateProfileImageModalInputRef.current;
    // 값 존재여부 검증
    if (!input) return false;
    const files = input.files;
    if (!files) return false;
    const file = files.item(0);
    if (!file) return false;
    // 리사이즈
    const resizedFile = await resizeImage(file, 256, 256);
    // 이후로직
    const sizeBytes = resizedFile.size;
    const mimeType = resizedFile.type;
    console.log(sizeBytes, mimeType);

    const res = await PresignProfileImage(mimeType, sizeBytes);
    if (!res) {
      console.log("Presign URL 가져오기 실패");
      setShowUpdateProfileImageModal(false);
      return false;
    }
    const uploadUrl = res.uploadUrl;
    const objectKey = res.objectKey;

    const uploadRes = await uploadProfileImage(uploadUrl, resizedFile);
    if (!uploadRes) {
      console.log("프로필 이미지 업로드 실패");
      setShowUpdateProfileImageModal(false);
      return false;
    }

    const { width, height } = await getImageSize(resizedFile);

    const data = await patchProfile({
      username: username ?? "",
      profileImage: {
        action: "SET",
        objectKey: objectKey,
        mimeType: mimeType,
        width: width,
        height: height,
        sizeBytes: sizeBytes,
      },
    });
    if (!data) {
      console.log("프로필 이미지 변경 실패");
      setShowUpdateProfileImageModal(false);
      return false;
    }
    setProfileImgSrc(data.profileImageUrl);
    setShowUpdateProfileImageModal(false);
  }
  function handleClickUpdateProfileImageModalInput() {
    const input = updateProfileImageModalInputRef.current;
    if (!input) return false;
    input.click();
  }
  function handleChangeUpdateProfileInputModalInput(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.currentTarget.files?.[0];
    if (file) {
      // console.log(URL.createObjectURL(file));
      setUpdateProfileImagePreview(file);
    }
  }

  const [showUpdateProfileImageModal, setShowUpdateProfileImageModal] =
    useState(false);
  const updateProfileImageModalInputRef = useRef<HTMLInputElement>(null);

  return (
    <StyledCnt>
      {userNotFound ? (
        <StyledUserNotFound>사용자를 찾을 수 없습니다</StyledUserNotFound>
      ) : (
        <>
          {showUpdateProfileImageModal && (
            <SUpdateProfileImageModal
              onClick={(e) => {
                if (e.currentTarget === e.target) {
                  setShowUpdateProfileImageModal(false);
                }
              }}
            >
              <SUpdateProfileImageModalIn>
                <SUpdateProfileImageModalTitle>
                  프로필 이미지 업데이트
                </SUpdateProfileImageModalTitle>
                <SUpdateProfileImageModalInputDisplay
                  onClick={handleClickUpdateProfileImageModalInput}
                  style={
                    updateProfileImagePreview
                      ? {
                          backgroundImage: `url("${URL.createObjectURL(
                            updateProfileImagePreview
                          )}")`,
                        }
                      : { backgroundImage: "none" }
                  }
                >
                  {updateProfileImagePreview
                    ? "이미지 변경"
                    : "이미지를 선택하세요"}
                </SUpdateProfileImageModalInputDisplay>
                <SUpdateProfileImageModalInputSubmitButtonWrapper>
                  <SUpdateProfileImageModalInputSubmitButtonRemove
                    onClick={() => {
                      clearProfile(username!);
                      location.reload();
                    }}
                  >
                    초기화
                  </SUpdateProfileImageModalInputSubmitButtonRemove>
                  <SUpdateProfileImageModalInputSubmitButton
                    onClick={updateProfileImage}
                  >
                    업로드
                  </SUpdateProfileImageModalInputSubmitButton>
                </SUpdateProfileImageModalInputSubmitButtonWrapper>
                <SUpdateProfileImageModalInput
                  ref={updateProfileImageModalInputRef}
                  onChange={handleChangeUpdateProfileInputModalInput}
                />
              </SUpdateProfileImageModalIn>
            </SUpdateProfileImageModal>
          )}
          <StyledHeader>
            <StyledUsername>{username}</StyledUsername>
            <StyledSettingBtn onClick={() => navigator("/settings")} />
          </StyledHeader>

          <StyledContent>
            <StyledProfileSection>
              <StyledProfileImage
                onClick={() => setShowUpdateProfileImageModal(true)}
                $img={profileImgSrc ?? noProfileImageSrc}
              />
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
                    {comments.map((cmt) => (
                      <ReplyItem
                        key={cmt.id}
                        username={cmt.author.username}
                        content={cmt.content ?? ""}
                        date={cmt.id.toString()}
                        img={cmt.author.profileImageUrl ?? profilePlaceholder}
                      />
                    ))}
                  </StyledRepliesWrapper>
                </StyledReplySection>

                <StyledFeedSection>
                  <StyledSectionTitle>게시한 피드</StyledSectionTitle>
                  <StyledFeedWrapper>
                    {feeds.map((feed) => (
                      <FeedCard key={feed.id} feed={feed} />
                    ))}
                  </StyledFeedWrapper>
                </StyledFeedSection>
              </StyledScrollAreaIn>
            </StyledScrollAreaOut>
          </StyledContent>
        </>
      )}

      <StyledNavbarWrapper>
        <Navbar />
      </StyledNavbarWrapper>
    </StyledCnt>
  );
};

export default Profile;
