import { type Comment } from "../types/Comment";

const comments = [
  {
    username: "hayo",
    profileUrl: "https://picsum.photos/150",
    content: "안녕하세요! 프로필 사진이 생겼어요.",
    date: "1일 전",
  },
  {
    username: "spiderman",
    profileUrl: "https://picsum.photos/150",
    content: "여러분의 다정한 이웃 스파이더맨! 거미줄 발사!",
    date: "방금",
  },
  {
    username: "username",
    profileUrl: "https://picsum.photos/150",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    date: "1일 전",
  },
  {
    username: "kinderjoy",
    profileUrl: "https://picsum.photos/150",
    content:
      "킨더 조이는 킨더 서프라이즈의 파생형 상품이다. 장난감이 기대돼요.",
    date: "1일 전",
  },
  {
    username: "developer_kim",
    profileUrl: "https://picsum.photos/150",
    content: "개발하기 좋은 날씨네요. 좋은 하루 되세요! 코딩!",
    date: "2분 전",
  },
  {
    username: "book_lover",
    profileUrl: "https://picsum.photos/150",
    content: "이 글 덕분에 새로운 책을 읽어보고 싶어졌어요. 감사합니다.",
    date: "3시간 전",
  },
  {
    username: "traveler_lee",
    profileUrl: "https://picsum.photos/150",
    content: "다음 여행지는 어디로 할까 고민 중입니다. 추천해주세요! ✈️",
    date: "5일 전",
  },
  {
    username: "foodie_park",
    profileUrl: "https://picsum.photos/150",
    content: "점심 메뉴로 뭘 먹을지 항상 고민이네요. 다들 맛점하세요! 🍔",
    date: "어제",
  },
  {
    username: "music_fanatic",
    profileUrl: "https://picsum.photos/150",
    content: "요즘 이 노래에 꽂혀서 무한 반복 중입니다. 다들 들어보세요! 🎶",
    date: "2주 전",
  },
  {
    username: "cat_daddy",
    profileUrl: "https://picsum.photos/150",
    content: "저희 집 고양이가 이 글을 읽더니 밥을 달라고 하네요. 😼",
    date: "10분 전",
  },
  {
    username: "runner_min",
    profileUrl: "https://picsum.photos/150",
    content: "오늘 아침 러닝 완료! 상쾌한 기분으로 하루를 시작합니다. 🏃‍♀️",
    date: "30분 전",
  },
  {
    username: "daily_news",
    profileUrl: "https://picsum.photos/150",
    content: "최신 IT 트렌드에 대한 유익한 정보 감사합니다.",
    date: "4일 전",
  },
];

export async function commentsRequest(): Promise<Comment[]> {
  // ~~댓글 요청~~~
  return comments.slice(...(()=>{const r = Math.random() * (comments.length - 6);return [r, r+5]})());
}
