import axios from "axios";

export const validateVerifyCode = async (email: string, code: string) => {
  try {
    const res = await axios.post(`https://${import.meta.env.VITE_API_URL}/api/users/email/verification/verify`, { email, code });
    return res;
  } catch (error) {
    console.log("인증 코드 검증 중 발생 에러: ", error);
  }
};