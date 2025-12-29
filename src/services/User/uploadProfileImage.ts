import axios, { AxiosError } from "axios";

export const uploadProfileImage = async (uploadUrl: string, objectKey: string) => {
  try {
    const res = await axios.put(uploadUrl, {
      updateProfile: objectKey,
      action: "SET"
    });
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
