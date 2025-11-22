import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface patchProfileResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number
}

export interface profileImageRequest {
  action: string,
  mediaId: number
}

export const PatchProfile = async (username: string, profileMessage: string, profileImage: profileImageRequest) => {
  try {
    const res = await axiosInstance.patch<patchProfileResponse>(`/api/users/me/profile`, {
      username: username,
      profileMessage: profileMessage,
      profileImage: profileImage
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};