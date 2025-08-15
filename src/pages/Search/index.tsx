import styled from "styled-components";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { HideScrollbar } from "../../styles/HideScrollbar";

import { UserCard } from "./UserCard";

import searchIcon from "../../assets/icons/search.svg";

const StyledCnt = styled.div`
  height: 100%;
  aspect-ratio: 9 / 19;
  margin: auto;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    aspect-ratio: unset;
  }
`;
const StyledHeader = styled.div`
  flex-shrink: 0;
  height: 85px;
  background-color: #222;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 27px;
`;
const StyledUsername = styled.div`
  font-size: 32px;
  line-height: 39px;
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 10px;
  & > img {
    width: 42px;
  }
`;
const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const StyledSearchSection = styled.div`
  flex-shrink: 0;
  display: flex;
  height: 124px;
  padding: 12px 21px;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
`;
const StyledSearchInput = styled.input.attrs({
  type: "text",
  placeholder: "검색어를 입력하세요",
})`
  width: 100%;
  background: #eee;
  border: none;
  padding: 8px 12px;
  &:focus {
    outline: none;
  }
`;
const StyledScrollAreaOut = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0 22px;
  ${HideScrollbar}
`;
const StyledScrollAreaIn = styled.div`
  height: max-content;
`;
const StyledNavbarWrapper = styled.div`
  flex-shrink: 0;
  height: 85px;
  position: relative;
  background: #f4f4f4;
`;

interface SearchResult {
  userId: number;
  username: string;
  profileImage: string;
}

const 임시검색결과1 = [
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
];
const 임시검색결과2 = [
  {
    userId: 1,
    username: "하영2",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영2",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
  {
    userId: 1,
    username: "하영2",
    profileImage:
      "https://res.cloudinary.com/dakcrgcnt/image/upload/v1754237963/testprofileimage.png",
  },
];

const Search = () => {
  const navigator = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  function search(term: string) {
    if (term === "하영") setSearchResults(임시검색결과1);
    else if (term === "하영2") setSearchResults(임시검색결과2);
    else setSearchResults([]);
  }

  function handleFollow(userId: number) {
    console.log(`유저 아이디 ${userId}를 팔로우합니다.`);
  }

  // 탭 이름 변경
  useEffect(() => {
    document.title = "Ripple | 검색";
  }, []);

  return (
    <StyledCnt>
      <StyledHeader>
        <StyledUsername>
          <img src={searchIcon} />
          <span>검색</span>
        </StyledUsername>
      </StyledHeader>

      <StyledContent>
        <StyledSearchSection>
          <StyledSearchInput onChange={(e) => search(e.currentTarget.value)} />
        </StyledSearchSection>

        <StyledScrollAreaOut>
          <StyledScrollAreaIn>
            {searchResults.length > 0
              ? searchResults.map((e) => (
                  <UserCard
                    key={e.userId}
                    userId={e.userId}
                    username={e.username}
                    profileImage={e.profileImage}
                    onProfileClick={() => navigator(`/${e.userId}`)}
                    onFollow={handleFollow}
                  />
                ))
              : "검색 결과가 없습니다."}
          </StyledScrollAreaIn>
        </StyledScrollAreaOut>
      </StyledContent>

      <StyledNavbarWrapper>
        <Navbar />
      </StyledNavbarWrapper>
    </StyledCnt>
  );
};

export default Search;
