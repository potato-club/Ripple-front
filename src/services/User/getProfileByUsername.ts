import {axiosInstance} from "../axiosClient";

export interface getProfileByUsernameResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number,
}

export const GetProfileByUsername = async (username: string) => {
  try {
    const res = await axiosInstance.get<getProfileByUsernameResponse>(`/api/users/by-username/${username}`);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("username으로 프로필 가져오기 발생 에러: ", error);
  }
};