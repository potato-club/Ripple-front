import {axiosInstance} from "../../axiosClient";

export interface getFollowersResponse {
  items: {
    id: number,
    username: string,
    profileImageUrl: string,
    profileMessage: string
  }[]
  nextCursor: string,
  hasNext: boolean
}

export const GetFollowers = async (id: string, cursor?:number, size?:number) => {
  try {
    const res = await axiosInstance.get<getFollowersResponse>(`/api/users/${id}/followers`, {params: {cursor: cursor, size: size}});
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 팔로워 가져오기 발생 에러: ", error);
  }
};