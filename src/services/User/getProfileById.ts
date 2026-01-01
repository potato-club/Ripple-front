import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface getProfileByIdResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number,
}

export const GetProfileById = async (id: string) => {
  try {
    const res = await axiosInstance.get<getProfileByIdResponse>(`/api/users/${id}`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};