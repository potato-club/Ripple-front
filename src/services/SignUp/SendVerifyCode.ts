import { axiosInstance } from "../axiosClient";

export interface sendVerifyCodeResponse {
  email: string
}

export const sendVerifyCode = async (email: string) => {
  try {
    const res = await axiosInstance.post(`/api/users/email/verification/send`, {email: email.trim()});
    if (!res.data)
      return res;
    else {
      throw new Error("반환 객체가 존재하지 않음.");
    }
  } catch (error) {
    console.log("인증 코드 전송 중 발생 에러: ", error);
  } finally {
    
  }
};