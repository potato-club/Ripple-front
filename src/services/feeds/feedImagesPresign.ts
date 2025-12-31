import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import z from "zod";

const feedImagesPresignSchema = z.object({
  items: z.array(
    z.object({
      uploadUrl: z.string(),
      objectKey: z.string(),
      maxSizeBytes: z.number(),
    })
  ),
});

type feedImagesPresignResponse = z.infer<typeof feedImagesPresignSchema>;

export interface feedImagesPresignRequest {
  files:
    {
      mimeType: string,
      sizeBytes: number
    }[];
}

export const feedImagesPresign = async (
  request: feedImagesPresignRequest
) => {
  try {
    const res = await axiosInstance.post<feedImagesPresignResponse>(
      `/api/feeds/images/presign`,
      request
    );
    if (res && feedImagesPresignSchema.safeParse(res.data)) return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};
