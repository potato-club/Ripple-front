import { axiosInstance } from "../axiosClient";

export const LogOutAll = async () => {
  try {
    const res = await axiosInstance.post(`/api/auth/logout/all`);
    return res;
  } catch (error) {
    console.log("내 차단 목록 조회 중 발생 에러: ", error);
  }
};
