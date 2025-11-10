import axios from "axios";

export const followUser = async (targetId: string) => {
  try {
    const res = await axios.get(`https://${import.meta.env.VITE_API_URL}/api/users/${targetId}/follow`);
    return res.data;
  } catch (error) {
    console.log("유저 팔로우 중 발생 에러: ", error);
  }
};