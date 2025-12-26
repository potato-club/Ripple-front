import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

type FeedReportReason = "SPAM" | "NUDITY" | "VIOLENCE" | "HATE_SPEECH" | "COPYRIGHT" | "ILLEGAL" | "OTHER"

export interface ReportFeedResponse {
  success: boolean,
  data: {
    feedId: number,
    reporterId: number,
    message: string
  },
  message: string
}

export const ReportFeed = async (feedId : number, reason: FeedReportReason, description: string) => {
  try {
    const res = await axiosInstance.post<ReportFeedResponse>(`/api/feeds/${feedId}/report`, {
        reason: reason,
        description: description
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};