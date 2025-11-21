import { create } from "zustand";
import { LogIn } from "../services/Auth/logIn";
import { getOrCreateDeviceId } from "../utils/getOrCreateDeviceId";

interface AuthState {
  deviceId: string; // 클라에서 생성 (임시)
  accessToken: string | null;
  logIn: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  deviceId: getOrCreateDeviceId(),
  accessToken: null,
  logIn: async (username, password) => {
    try {
      const res = await LogIn(username, password, get().deviceId);
      if (!res || !res.data.accessToken)
        return { ok: false, errorMessage: "다시 시도해보세요" };
      else if (res.status === 400 || res.status === 401)
        return {
          ok: false,
          errorMessage: "아이디 혹은 비밀번호가 일치하지 않습니다",
        };
      else if (res.status === 200) {
        set({
          accessToken: res.data.accessToken,
        });
        return { ok: true };
      } else return { ok: false, errorMessage: "예기치 못한 오류" };
    } catch {
      return { ok: false, errorMessage: "다시 시도해보세요" };
    }
  },
  logOut: () => {},
}));
