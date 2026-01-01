import z from "zod";
import { axiosInstance } from "../../axiosClient";

const FollowUserResponseSchema = z.object({
  fromUserId: z.number(),
  toUserId: z.number(),
  following: z.boolean(),
});

type FollowUserResponse = z.infer<typeof FollowUserResponseSchema>;

function isFollowUserResponse(a: unknown): a is FollowUserResponse {
  return FollowUserResponseSchema.safeParse(a).success;
}

export const FollowUser = async (targetId: number) => {
  try {
    const res = await axiosInstance.put<FollowUserResponse>(
      `/api/users/me/followings/${targetId}`
    );
    if (isFollowUserResponse(res.data)) return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 팔로우 중 발생 에러: ", error);
  }
};
