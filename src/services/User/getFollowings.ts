import axios from "axios";

export const checkDuplicateUser = async (username: string, email: string) => {
  try {
    const res = await axios.get(`https://${import.meta.env.VITE_API_URL}/api/users/availability`, { params: { username: username.trim(), email: email.trim() } });
    return res.data.emailAvailable;
  } catch (error) {
    console.log("유저 중복 검사중 발생 에러: ", error);
  }
};