import axios from "axios";
import type { Feed } from "../types/Feed";

export const postFeed = (feed: Feed) => {
  axios.post("/api/feeds", {
    content: feed.content,
    thumbnail: feed.thumbnail,
    mediaKeys: feed.mediaUrls,
    tags: feed.tags,
    visibility: "PUBLIC",
  }, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN}`
    }
  });
};
