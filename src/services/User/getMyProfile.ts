import {axiosInstance} from "../axiosClient";

export interface getMyProfileResponse {
  id: number,
  username: string,
  email: string,
  emailVerified: boolean,
  profileImageUrl: string,
  profileMessage: string,
  status: string,
  tokenVersion: number,
  lastLoginAt: string,
  createdAt: string,
  updatedAt: string
}

export const GetMyProfile = async () => {
  try {
    const res = await axiosInstance.get<getMyProfileResponse>(`/api/users/me`);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("내 정보 조회 중 발생 에러: ", error);
  }
};