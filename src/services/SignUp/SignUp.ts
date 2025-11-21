import { axiosInstance } from "../axiosClient";

export interface SignUpResponse{
  username: string,
  email: string,
  password: string
}

export const SignUp = async (username: string, email: string, password: string) => {
  try {
    const res = await axiosInstance.post(`/api/users`, {username: username.trim(), email: email.trim(), password: password.trim() });
    return res
  } catch (error) {
    console.log("회원가입 에러: ", error);
  }
};