import {axiosInstance} from "../axiosClient";

export interface checkDuplicateUserResponse {
  username: boolean,
  email: boolean
}

export const checkDuplicateUser = async (username: string, email: string) => {
  try {
    const res = await axiosInstance.get(`/api/users/availability`, { params: { username: username.trim(), email: email.trim() }},);
    if (!res.data)
      return res.data;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("유저 중복 검사중 발생 에러: ", error);
  }
}