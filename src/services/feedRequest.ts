// import { useAuthStore } from "../stores/useAuthStore";
import axios from "axios";
import type { Feed } from "../types/Feed";

export async function feedRequest(): Promise<Feed> {
  // const username = useAuthStore((state) => state.username);

  const feed: Feed = {
    id: new Date().getTime(),
    authorId: new Date().getTime(),
    createdAt: new Date().getDate().toString(),
    bookmarkCount: Math.floor(Math.random() * 200),
    likeCount: Math.floor(Math.random() * 200),
    status: "PUBLISHED",
    tags: ["food", "eat"],
    visibility: "PUBLIC",
    mediaUrls: ["https://placehold.co/400","https://placehold.co/400","https://placehold.co/400"],
    isVideo: false,
    content: "TEMP",
  };
  return feed;

  try {
    const feeds = await axios.get<Feed>(`${import.meta.env.BASE_URL}/api/feed`);
    console.log(feeds.data.authorId + "의 피드를 가져옴");
    return feeds.data;
  } catch (e) {
    console.error("[SERVER ERROR]", String(e));
    throw new Error(String(e));
  }
}
