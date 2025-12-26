import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface GetHomeFeedsResponse {
  id: number,
  senderId: number,
  limit: string,
  sentAt: string
}

export const GetHomeFeeds = async (cursor: number | null, limit: string) => {
  try {
    let res;
        if (cursor !== null) {
          res = await axiosInstance.get<GetHomeFeedsResponse>(`GetHomeFeedsResponse`, {params: {
            cursor: cursor,
            limit: limit
          }});
          return res.data;
        } else {
          res = await axiosInstance.get<GetHomeFeedsResponse>(`GetHomeFeedsResponse`, {params: {
            limit: limit
          }});
        }
        return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};