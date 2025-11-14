import axios from "./axiosClient";

export const refreshToken = async (deviceId: string) => {
  try {
    const res = await axios.post(`/api/auth/refresh`, {deviceId});
    return res.data;
  } catch (error) {
    console.log("엑세스 토큰 발급 중 에러: ", error);
  }
};