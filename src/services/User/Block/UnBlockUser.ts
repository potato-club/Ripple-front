import {axiosInstance} from "../../axiosClient";

export const UnBlockUser = async (targetId: string) => {
  try {
    const res = await axiosInstance.delete(`/api/users/${targetId}/block`);
    return res;
  } catch (error) {
    console.log("차단 해제 중 발생 에러: ", error);
  }
};