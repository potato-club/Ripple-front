import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import z from "zod";

const PresignProfileImageSchema = z.object({
  uploadUrl: z.string(),
  objectKey: z.string(),
  maxSizeBytes: z.number(),
});

type PresignProfileImageResponse = z.infer<typeof PresignProfileImageSchema>;

export const PresignProfileImage = async (
  mimeType: string,
  sizeBytes: number
) => {
  try {
    const res = await axiosInstance.post<PresignProfileImageResponse>(
      `/api/users/me/profile-image/presign`,
      {
        mimeType: mimeType,
        sizeBytes: sizeBytes,
      }
    );
    if (res && PresignProfileImageSchema.safeParse(res.data)) return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};
