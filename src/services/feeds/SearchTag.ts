import { isAxiosError } from "axios";
import {axiosInstance} from "../axiosClient";

export interface SearchTagResponse {
  Items: string[]
}

export const SearchTag = async (query : string) => {
  try {
    const res = await axiosInstance.get<SearchTagResponse>(`/api/feeds/search/tag`, {params: {
        query: query
    }});
    return res.data;
  } catch (error) {
    if(isAxiosError(error)) {
      console.log("status:", error.response?.status);
      console.log(error.response?.data);
    }
    throw error;
  }
};