import {axiosInstance} from "../axiosClient";

export interface getProfileByIdResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number,
}

export const GetProfileById = async (id: string) => {
  try {
    const res = await axiosInstance.get<getProfileByIdResponse>(`/api/users/${id}`);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("ID로 프로필 가져오기 중 발생 에러: ", error);
  }
};