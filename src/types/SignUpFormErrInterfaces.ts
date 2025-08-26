interface FormValues {
  email: string;
  certifyCode: string;
  id: string;
  pw: string;
  pwCheck: string;
}
interface EmailStatus {
  sent: boolean;
  verified: boolean;
  timerOn: boolean;
}

export type { FormValues, EmailStatus };
