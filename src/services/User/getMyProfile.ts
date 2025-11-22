import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface getMyProfileResponse {
  id: number,
  username: string,
  email: string,
  emailVerified: boolean,
  profileImageUrl: string,
  profileMessage: string,
  status: string,
  tokenVersion: number,
  lastLoginAt: string,
  createdAt: string,
  updatedAt: string
}

export const GetMyProfile = async () => {
  try {
    const res = await axiosInstance.get<getMyProfileResponse>(`/api/users/me`);
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};