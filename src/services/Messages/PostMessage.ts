import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface PostMessageResponse {
  id: number,
  senderId: number,
  content: string,
  sentAt: string
}

export const PostMessage = async (conversationId: string, content: string) => {
  try {
    const res = await axiosInstance.post<PostMessageResponse>(`/api/messages`, {
      conversationId: conversationId,
      content: content,
      messageType: "TEXT"
    });
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};