export const getCookie = (name: string): string | null => {
  // 특수문자가 포함된 이름을 처리하기 위해 이스케이프 처리
  const nameEqual = encodeURIComponent(name) + "=";
  
  // 쿠키 문자열에서 name=value 패턴을 찾음
  const parts = document.cookie.split(";");

  for (let i = 0; i < parts.length; i++) {
    let char = parts[i].trim(); // 앞뒤 공백 제거
    
    // 해당 이름으로 시작하는 쿠키를 찾았다면
    if (char.indexOf(nameEqual) === 0) {
      // 값을 디코딩하여 반환
      return decodeURIComponent(char.substring(nameEqual.length));
    }
  }

  // 찾는 쿠키가 없을 경우
  return null;
};