import axios from "axios";

export const sendVerifyCode = async (username: string, email: string, password: string) => {
  try {
    const res = await axios.post(`https://${import.meta.env.VITE_API_URL}/api/users`, {username: username.trim(), email: email.trim(), password: password.trim() });
    return res
  } catch (error) {
    console.log("회원가입 에러: ", error);
  }
};