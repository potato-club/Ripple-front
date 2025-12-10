import axios from "axios";

export const usernameRequest = async (id: number) => {
  return "tmp_username";
  try {
    const raw = await axios.get(`${import.meta.env.VITE_API_URL}/api/username`, {
      params: { id },
    });
    return raw.data.url
  } catch (err) {
    console.error(String(err));
  }
};
