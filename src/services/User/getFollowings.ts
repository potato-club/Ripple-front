import axios from "../axiosClient";

export const getFollowings = async (id: string, cursor?:number, size?:number) => {
  try {
    const res = await axios.get(`/api/users/${id}/getFollowings`, {params: {cursor: cursor, size: size}});
    return res.data;
  } catch (error) {
    console.log("유저 팔로워 발생 에러: ", error);
  }
};