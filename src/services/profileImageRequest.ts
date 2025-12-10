import axios from "axios";

export const profileImageRequest = async (id: number) => {
  return "https://picsum.photos/150";
  try {
    const raw = await axios.get(`${import.meta.env.VITE_API_URL}/api/profile`, {
      params: { id },
    });
    return raw.data.url
  } catch (err) {
    console.error(String(err));
  }
};
