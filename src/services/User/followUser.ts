import axios from "../axiosClient";

export const followUser = async (targetId: string) => {
  try {
    const res = await axios.get(`/v1/api/users/${targetId}/follow`);
    return res.data;
  } catch (error) {
    console.log("유저 팔로우 중 발생 에러: ", error);
  }
};