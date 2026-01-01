import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import * as S from "./Search.styles";

import { UserCard } from "./UserCard";

import searchIcon from "../../assets/icons/search.svg";
import { searchUser } from "../../services/User/searchUser";
import { FollowUser } from "../../services/User/Follow/FollowUser";

interface SearchResult {
  items: { id: number; username: string; profileImageUrl: string | null }[];
  nextCursor: number | null;
  hasNext: boolean;
}

const Search = () => {
  const navigator = useNavigate();
  const [searchResults, setSearchResults] = useState<SearchResult>();

  async function search(term: string) {
    try {
      const res = await searchUser(term, 20);
      setSearchResults(res);
    } catch (err) {
      console.error(err);
      setSearchResults({ hasNext: false, items: [], nextCursor: null });
    }
  }

  async function handleFollow(id: number) {
    const res = await FollowUser(id);
    if (res)
      console.log(
        `[ ID: ${res.fromUserId} > ID: ${res.toUserId} ] => Following: ${res.following}`
      );
  }

  // 탭 이름 변경
  useEffect(() => {
    document.title = "Ripple | 검색";
  }, []);

  return (
    <S.Cnt>
      <S.Header>
        <S.Username>
          <img src={searchIcon} />
          <span>검색</span>
        </S.Username>
      </S.Header>

      <S.Content>
        <S.SearchSection>
          <S.SearchInput onChange={(e) => search(e.currentTarget.value)} />
        </S.SearchSection>

        <S.ScrollAreaOut>
          <S.ScrollAreaIn>
            {searchResults && searchResults.items.length !== 0 ? (
              searchResults.items.map((e) => (
                <UserCard
                  key={e.id}
                  id={e.id}
                  username={e.username}
                  profileImageUrl={e.profileImageUrl}
                  onFollow={handleFollow}
                  onProfileClick={() => {}}
                />
              ))
            ) : (
              <S.NoResult>검색 결과가 없어요</S.NoResult>
            )}
          </S.ScrollAreaIn>
        </S.ScrollAreaOut>
      </S.Content>

      <S.NavbarWrapper>
        <Navbar />
      </S.NavbarWrapper>
    </S.Cnt>
  );
};

export default Search;
