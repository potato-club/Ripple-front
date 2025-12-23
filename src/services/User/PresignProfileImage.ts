import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface PresignProfileImageResponse {
  uploadUrl: string,
  objectKey: string,
  maxSizeBytes: number
}

export const PresignProfileImage = async (mimeType: string, sizeBytes: number) => {
  try {
    const res = await axiosInstance.post<PresignProfileImageResponse>(`/api/users/me/profile-image/presign`, {
      mimeType: mimeType,
      sizeBytes: sizeBytes
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};