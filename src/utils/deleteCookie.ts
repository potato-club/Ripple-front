export const deleteCookie = (name: string, path: string = "/") => {
  // 만료시간을 -1일로 설정
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=-1; path=${path};`;
};