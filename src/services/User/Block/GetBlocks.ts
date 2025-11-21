import {axiosInstance} from "../../axiosClient";

export interface getBlocksResponse {
  items: {
    id: number,
    username: number,
    profileImageUrl: string,
    profileMessage: string,
  }[],
  nextCursor: string,
  hasNext: boolean
}

export const GetBlocks = async (cursor: string, size: string) => {
  try {
    const res = await axiosInstance.get<getBlocksResponse>(`/api/users/me/blocks`, {params: {cursor: cursor, size: size}});
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("내 차단 목록 조회 중 발생 에러: ", error);
  }
};