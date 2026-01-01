import { create } from "zustand";
import { getMyProfile } from "../services/User/getMyProfile";

interface MyProfileState {
  data?: {
    id: number;
    username: string;
    email: string;
    emailVerified: boolean;
    profileImageUrl: string | null;
    status: string;
    tokenVersion: number;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
  };
  refresh: () => void;
}

export const useMyProfileStore = create<MyProfileState>((set) => ({
  refresh: async () => {
    const myProfile = await getMyProfile();
    // console.log(myProfile)
    if (myProfile) set({ data: myProfile });
    else console.log("Failed to get my profile");
  },
}));
