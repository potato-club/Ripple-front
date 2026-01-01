import { isAxiosError } from "axios";
import {axiosInstance} from "../../axiosClient";

export const UnBlockUser = async (targetId: string) => {
  try {
    const res = await axiosInstance.delete(`/api/users/${targetId}/block`);
    return res;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};