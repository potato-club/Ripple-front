import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import z from "zod";

const MyProfileSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  profileImageUrl: z.string().nullable(),
  status: z.string(),
  tokenVersion: z.number(),
  lastLoginAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type MyProfileResponse = z.infer<typeof MyProfileSchema>;

function isMyProfile(raw: unknown): raw is MyProfileResponse {
  return MyProfileSchema.safeParse(raw).success;
}

export const getMyProfile = async () => {
  try {
    const res = await axiosInstance.get<MyProfileResponse>(`/api/users/me`);
    // console.log(res);
    if (res && isMyProfile(res.data)) return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    } else {
      console.log(error);
    }
  }
  return false;
};
