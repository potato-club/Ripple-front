import {axiosInstance} from "../axiosClient";

export const refreshToken = async (deviceId: string) => {
  try {
    const res = await axiosInstance.post(`/api/auth/refresh`, 
      {
        header: {
          'X-Device-Id': deviceId.trim(),
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log("엑세스 토큰 발급 중 에러: ", error);
  }
};