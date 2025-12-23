import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface GetMessagesResponse {
  id: number,
  senderId: number,
  content: string,
  sentAt: string
}

export const GetMessages = async (conversationId: string, content: string) => {
  try {
    const res = await axiosInstance.get<GetMessagesResponse>(`/api/messages`, {params: {
        conversationId:conversationId, 
        content:content
    }});
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log(error.response?.data);
    }
  }
};