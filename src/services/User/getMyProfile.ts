import axios from "../axiosClient";

export const getMyProfile = async () => {
  try {
    const res = await axios.get(`/v1/api/users/me`);
    return res.data;
  } catch (error) {
    console.log("내 정보 조회 중 발생 에러: ", error);
  }
};