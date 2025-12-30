import { create } from "zustand";
import { LogIn } from "../services/Auth/LogIn";
import { LogOut } from "../services/Auth/LogOut";
import { setCookie } from "../utils/setCookie";
import { getCookie } from "../utils/getCookie";
import { v4 as uuidv4 } from "uuid";

interface AuthState {
  isLogIn: boolean;
  deviceId: string;
  logIn: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  logOut: () => void;
  logOutAll: () => void;
  checkIsLoggedIn: () => boolean;
}

const getOrSetDeviceId = () => {
  const DEVICE_ID_KEY = `${import.meta.env.VITE_LOCALSTORAGE_BASE}device_id`;

  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isLogIn: false,
  deviceId: getOrSetDeviceId(),
  logIn: async (username, password) => {
    const res = await LogIn(username, password, get().deviceId);
    console.log("[Login] Response:", res);
    // 응답 없음
    if (!res) {
      return { ok: false, errorMessage: "다시 시도해보세요" };
    }
    // 인증 오류
    else if (res.status === 400 || res.status === 401) {
      return {
        ok: false,
        errorMessage: "아이디 혹은 비밀번호가 일치하지 않습니다",
      };
    }
    // 로그인 성공
    else if (res.status === 200) {
      set({ isLogIn: true });
      setCookie(
        import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN,
        res.data.accessToken
      );

      return { ok: true };
    }
    // 예외
    else {
      return { ok: false, errorMessage: "예기치 못한 오류" };
    }
  },
  logOut: async () => {
    const res = await LogOut();
    // 응답 없음
    if (!res) {
      console.error("[Logout] 응답 없음");
    }
    // 로그아웃 성공
    else if (res.status == 204) {
      set({ isLogIn: false });
      console.log("[Logout] 로그아웃 성공");
    }
  },
  logOutAll: async () => {
    const res = await LogOut();
    if (res?.status == 200) {
      set({ isLogIn: false });
    }
  },
  checkIsLoggedIn: () => {
    const accessToken = getCookie(import.meta.env.VITE_LOCALSTORAGE_BASE);
    if (accessToken) {
      set({ isLogIn: true });
      return true;
    } else {
      return false;
    }
  },
}));
