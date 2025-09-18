import axios from "axios";

export const sendVerifyCode = async (email: string) => {
  try {
    const res = await axios.post(`https://${import.meta.env.VITE_API_URL}/api/users/email/verification/send`, {email: email.trim() });
    return res
  } catch (error) {
    console.log("인증 코드 전송 중 발생 에러: ", error);
  }
};