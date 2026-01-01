import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export interface patchProfileResponse {
  id: number;
  username: string;
  profileImageUrl: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
}

export const clearProfile = async (username: string) => {
  const request = { username, profileImage: { action: "CLEAR" } };
  try {
    const res = await axiosInstance.patch<patchProfileResponse>(
      `/api/users/me/profile`,
      request
    );
    console.log("patch profile response", res.data);
    if (res) return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    return false;
  }
};
