import axios, { AxiosError } from "axios";

export const uploadProfileImage = async (uploadUrl: string, file: File | Blob) => {
  try {
    const res = await axios.put(uploadUrl, file, {
      headers: { "Content-Type": file.type },
    });
    if (res.status !== 200) return false;
    return true;
  } catch (e) {
    if (e instanceof AxiosError) {
      console.error("[Axios]", e.message);
    } else {
      console.error(e);
    }
    return false;
  }
};
