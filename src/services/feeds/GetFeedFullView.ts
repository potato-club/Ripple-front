import { isAxiosError } from "axios";
import { axiosInstance } from "../axiosClient";
import { FeedFullViewSchema, type FeedFullView } from "../../types/FeedFullview";
import z from "zod";

export const GetFeedFullView = async (feedId: number): Promise<FeedFullView> => {
  try {
    const res = await axiosInstance.get(`/api/feeds/${feedId}/fullView`);
    
    const validatedData = FeedFullViewSchema.parse(res.data);
    
    return validatedData;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("API Response Error:", error.response?.status, error.response?.data);
    } else if (error instanceof z.ZodError) {
      
      console.error("Data Validation Error:", error.issues);
    }
    throw error;
  }
};