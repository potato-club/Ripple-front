import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type categoryType = "HATE_SPEECH_ABUSE";
type statusType = "REVIEWING" | "RESOLVED" | "REJECTED";

export interface ReportCommentsResponse {
  id: number,
  commentId: number,
  reporterId: number,
  category: categoryType,
  status: statusType,
  reason: string,
  createdAt: string
}

/**
 * 
 * 댓글을 신고합니다.
 * 동일 사용자가 동일 댓글을 중복 신고하면 실패합니다.
 * 기존 신고 상태(REVIEWING/RESOLVED/REJECTED)에 따라 메시지가 달라질 수 있습니다.
 */

export const ReportComments = async (commentId : string, category: categoryType, reason: string) => {
  try {
    const res = await axiosInstance.post<ReportCommentsResponse>(`/api/comments/${commentId}/reports`, {
        category: category, 
        reason: reason
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
  }
};