import {axiosInstance} from "../axiosClient";

export const PatchPassword = async (currentPassword: string, newPassword: string) => {
  try {
    const res = await axiosInstance.patch(`/api/users/me/password`, {currentPassword: currentPassword.trim(), newPassword: newPassword.trim()});
    return res;
  } catch (error) {
    console.log("비밀번호 변경 중 발생 에러: ", error);
  }
};