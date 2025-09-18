interface FormValues {
  email: string;
  verifyCode: string;
  id: string;
  pw: string;
  pwCheck: string;
  signup: string; // 회원가입 에러 메시지용
}
interface EmailStatus {
  sent: boolean;
  verified: boolean;
  timerOn: boolean;
}

export type {FormValues, EmailStatus};