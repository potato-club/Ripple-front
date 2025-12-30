import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type actionType = "KEEP" | "CLEAR " | "SET";

export interface patchProfileResponse {
  id: number,
  username: string,
  profileImageUrl: string,
  postCount: number,
  followerCount: number,
  followingCount: number
}

export interface profileImageRequest {
  "username": string,
  "profileImage": {
    "action": actionType,
    "objectKey": string | null,
    "mimeType": string | null,
    "width": number | null,
    "height": number | null,
    "sizeBytes": number | null
  }
}

export const PatchProfile = async (request: profileImageRequest) => {
  try {
    const res = await axiosInstance.patch<patchProfileResponse>(`/api/users/me/profile`, {
      request
    });
    console.log("patch profile response", res.data);
    if (res) return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    return false;
  }
};