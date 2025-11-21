import {axiosInstance} from "../../axiosClient";

export interface followUserResponse {
  fromUserId: number,
  toUserId: number,
  following: boolean
}

export const FollowUser = async (targetId: string) => {
  try {
    const res = await axiosInstance.get<followUserResponse>(`/api/users/${targetId}/follow`);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 팔로우 중 발생 에러: ", error);
  }
};