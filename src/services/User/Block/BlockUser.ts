import {axiosInstance} from "../../axiosClient";

export interface BlockUserResponse {
  fromUserId: number,
  toUserId: number,
  blocked: boolean
}

export const BlockUser = async (targetId: string) => {
  try {
    const res = await axiosInstance.delete<BlockUserResponse>(`/api/users/${targetId}/block`);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 차단 중 발생 에러: ", error);
  }
};