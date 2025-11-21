import {axiosInstance} from "../axiosClient";

export const checkDuplicateUser = async (username: string, email: string) => {
  try {
    const res = await axiosInstance.get(`/api/users/availability`, { params: { username: username.trim(), email: email.trim() }},);
    return res.data.emailAvailable;
  } catch (error) {
    console.log("유저 중복 검사중 발생 에러: ", error);
  }
}