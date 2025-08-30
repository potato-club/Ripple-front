import { create } from "zustand";
import { logIn } from "../services/logIn";
import { getOrCreateDeviceId } from "../utils/getOrCreateDeviceId";

interface AuthState {
  id: number | null;
  username: string | null;
  email: string | null;
  deviceId: string; // 클라에서 생성 (임시)
  accessToken: string | null;
  refreshToken: string | null; // 무보안 클라 저장 (임시)
  logIn: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; errorMessage?: string }>;
  logOut: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  id: null,
  username: null,
  email: null,
  deviceId: getOrCreateDeviceId(),
  accessToken: null,
  refreshToken: null,
  logIn: async (username, password) => {
    try {
      const res = await logIn(username, password, get().deviceId);
      if (!res || !res.data.accessToken || !res.data.refreshToken)
        return { ok: false, errorMessage: "다시 시도해보세요" };
      else if (res.status === 400 || res.status === 401)
        return {
          ok: false,
          errorMessage: "아이디 혹은 비밀번호가 일치하지 않습니다",
        };
      else if (res.status === 200) {
        set({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        return { ok: true };
      } else return { ok: false, errorMessage: "예기치 못한 오류" };
    } catch {
      return { ok: false, errorMessage: "다시 시도해보세요" };
    }
  },
  logOut: () => {},
}));
