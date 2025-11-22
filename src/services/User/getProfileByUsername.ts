import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface getProfileByUsernameResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number,
}

export const GetProfileByUsername = async (username: string) => {
  try {
    const res = await axiosInstance.get<getProfileByUsernameResponse>(`/api/users/by-username/${username}`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};