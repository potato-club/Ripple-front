import axios from "../axiosClient";

export const SignUp = async (username: string, email: string, password: string) => {
  try {
    const res = await axios.post(`/v1/api/users`, {username: username.trim(), email: email.trim(), password: password.trim() });
    return res
  } catch (error) {
    console.log("회원가입 에러: ", error);
  }
};