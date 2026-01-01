import { isAxiosError } from "axios";
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
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};