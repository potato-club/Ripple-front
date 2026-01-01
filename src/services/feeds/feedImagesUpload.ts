import axios, { isAxiosError } from "axios";

export const feedImagesUpload = async (
  uploadUrl: string,
  file: File
) => {
  try {
    const res = await axios.put(
      uploadUrl,
      file,
      {
        headers: {
          "Content-Type": file.type,
        },
      }
    );
    if (res.status !== 200) return false;
    return true;
  } catch (e) {
    if (isAxiosError(e)) {
      console.error("[Axios]", e.message);
    } else {
      console.error(e);
    }
    return false;
  }
};