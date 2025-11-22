import { isAxiosError } from "axios";
import {axiosInstance} from "../../axiosClient";

export interface BlockUserResponse {
  fromUserId: number,
  toUserId: number,
  blocked: boolean
}

export const BlockUser = async (targetId: string) => {
  try {
    const res = await axiosInstance.delete<BlockUserResponse>(`/api/users/${targetId}/block`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};