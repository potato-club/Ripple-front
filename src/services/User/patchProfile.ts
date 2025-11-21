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
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("프로필 변경 중 발생 에러: ", error);
  }
};