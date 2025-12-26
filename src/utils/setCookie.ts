export const setCookie = (
  name: string,
  value: string,
  options: {
    days?: number;
    path?: string;
    secure?: boolean;
    samesite?: "Lax" | "Strict" | "None";
  } = { path: "/", samesite: "Lax" }
) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.days) {
    const date = new Date();
    date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${date.toUTCString()}`;
  }

  cookieString += `; path=${options.path ?? "/"}`;
  cookieString += `; samesite=${options.samesite ?? "Lax"}`;

  // SameSite=None일 때는 반드시 Secure가 true여야 함
  if (options.secure || options.samesite === "None") {
    cookieString += "; secure";
  }

  document.cookie = cookieString;
};
