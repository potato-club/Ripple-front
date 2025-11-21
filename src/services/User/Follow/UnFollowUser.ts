import {axiosInstance} from "../../axiosClient";

export const UnFollowUser = async (targetId : string) => {
  try {
    const res = await axiosInstance.delete(`/api/users/${targetId}/follow`);
      return res;
  } catch (error) {
    console.log("언팔로우 중 발생 에러: ", error);
  }
};