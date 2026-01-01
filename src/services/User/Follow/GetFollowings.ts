import {axiosInstance} from "../../axiosClient";

export interface getFollowingsResponse {
  items: {
    id: number,
    username: string,
    profileImageUrl: string,
    profileMessage: string
  }[]
  nextCursor: string,
  hasNext: boolean
}

export const GetFollowings = async (id: string, cursor?:number, size?:number) => {
  try {
    const res = await axiosInstance.get<getFollowingsResponse>(`/api/users/${id}/getFollowings`, {params: {cursor: cursor, size: size}});
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 팔로잉 가져오기 발생 에러: ", error);
  }
};