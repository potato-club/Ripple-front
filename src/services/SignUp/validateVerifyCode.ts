import { axiosInstance } from "../axiosClient";

export const ValidateVerifyCode = async (email: string, code: string) => {
  try {
    const res = await axiosInstance.post(`/api/users/email/verification/verify`, { email, code });
    return res;
  } catch (error) {
    console.log("인증 코드 검증 중 발생 에러: ", error);
  }
};