import { BrowserRouter, Routes, Route } from "react-router";
import styled from "styled-components";
import useIsMobile from "./hooks/useIsMobile";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import FindIDPW from "./pages/FindIDPW";
import Search from "./pages/Search";
import Upload from "./pages/Upload";
import FeedPage from "./pages/Feed";
import { useMyProfileStore } from "./stores/useMyProfileStore";
import { useEffect } from "react";

const StyledDesktopErrorCnt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function App() {
  const isMobile = useIsMobile();
  const refreshMyProfile = useMyProfileStore((state) => state.refresh);
  useEffect(() => {
    refreshMyProfile();
  }, []);
  return isMobile ? (
    <BrowserRouter>
      <Routes>
        {/* <Route index element={<Landing />} /> */}
        <Route index element={<FeedPage />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/findIDPW" element={<FindIDPW />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <StyledDesktopErrorCnt>
      <h1>모바일 기기에서만 호환합니다.</h1>
    </StyledDesktopErrorCnt>
  );
}

export default App;
