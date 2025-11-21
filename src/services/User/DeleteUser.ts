import {axiosInstance} from "../axiosClient";

export const DeleteUser = async () => {
  try {
    const res = await axiosInstance.delete(`/api/users/me`);
    return res;
  } catch (error) {
    console.log("회원 탈퇴 중 발생 에러: ", error);
  }
};