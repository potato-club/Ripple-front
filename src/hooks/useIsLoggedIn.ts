import { useState } from "react";
import { getCookie } from "../utils/getCookie";

export const useIsLoggedIn = () => {
  const accessToken = getCookie(import.meta.env.VITE_COOKIE_PATH_ACCESSTOKEN);
  const [isLoggedIn] = useState(!!accessToken);

  return isLoggedIn;
};
