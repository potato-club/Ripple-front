import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import z from "zod";

const ProfileByUsernameSchema = z.object({
  id: z.number(),
  username: z.string(),
  profileImageUrl: z.string(),
  postCount: z.number(),
  followerCount: z.number(),
  followingCount: z.number(),
});

type ProfileByUsernameResponse = z.infer<typeof ProfileByUsernameSchema>;

export const getProfileByUsername = async (username: string) => {
  try {
    const res = await axiosInstance.get<ProfileByUsernameResponse>(
      `/api/users/by-username/${username}`
    );
    if (res && ProfileByUsernameSchema.safeParse(res.data)) return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error);
    } else {
      console.log(error)
    }
  }
  return false;
};
