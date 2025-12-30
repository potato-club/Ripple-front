import axios, { AxiosError } from "axios";

export const uploadProfileImage = async (uploadUrl: string, file: File, fileType: string) => {
  try {
    const res = await axios.put(uploadUrl, file, {
      headers: {"Content-Type": fileType}
    });
    if (res.status === 200) return true;   
    else return false;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("[Axios]", e.message);
    } else {
      console.error(e);
    }
  }
};
