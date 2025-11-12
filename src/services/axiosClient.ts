import axios from 'axios';

// 전역 axios 기본 설정을 중앙화합니다. 개발 중에는 '/v1' 프록시를 사용하도록 baseURL을 빈값으로 두고,
// production에서는 환경변수에 따라 실제 API URL을 사용하도록 합니다.
axios.defaults.withCredentials = true; // 모든 요청에 쿠키 포함

export default axios;