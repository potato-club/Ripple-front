import { AxiosError } from "axios";
import { axiosInstance } from "../axiosClient";

export const uploadProfileImage = async (uploadUrl: string, file: File) => {
  try {
    const res = await axiosInstance.put(uploadUrl, file);
    if (res && res.data) return res.data;
    else return false;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("[Axios]", e.message);
    } else {
      console.error(e);
    }
  }
};
