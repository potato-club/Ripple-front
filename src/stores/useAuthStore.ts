import { create } from "zustand";
import { LogIn } from "../services/Auth/LogIn";
import { getOrCreateDeviceId } from "../utils/getOrCreateDeviceId";
import { LogOut } from "../services/Auth/LogOut";

interface AuthState {
  isLogIn: boolean;
  deviceId: string; // 클라에서 생성 (임시)
  accessToken: string | null;
  logIn: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  logOut: () => void;
  logOutAll: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isLogIn: false,
  deviceId: getOrCreateDeviceId(),
  accessToken: null,
  logIn: async (username, password) => {
    const res = await LogIn(username, password, get().deviceId);
    if (!res || !res.data.accessToken) {
      return { ok: false, errorMessage: "다시 시도해보세요" };
    }
    else if (res.status === 400 || res.status === 401) {
      return {
        ok: false,
        errorMessage: "아이디 혹은 비밀번호가 일치하지 않습니다",
      };
    }
    else if (res.status === 200) {
      set({
        isLogIn: true,
        accessToken: res.data.accessToken,
      });
      return { ok: true };
    } 
    else {
      return { ok: false, errorMessage: "예기치 못한 오류" };
    }
  },
  logOut: async () => {
    const res = await LogOut();
    if (res?.status == 204) {
      set({
        isLogIn: false,
        accessToken: null
      });
    }
  },
  logOutAll: async () => {
    const res = await LogOut();
    if (res?.status == 200) {
      set({
        isLogIn: false,
        accessToken: null
      });
    }
  }
}));
