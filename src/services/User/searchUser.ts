import z from "zod";
import { axiosInstance } from "../axiosClient";

const ResponseSchema = z.object({
  items: z.array(
    z.object({
      id: z.number(),
      username: z.string(),
      profileImageUrl: z.string().nullable(),
      following: z.boolean(),
    })
  ),
  nextCursor: z.number().nullable(),
  hasNext: z.boolean(),
});
type Response = z.infer<typeof ResponseSchema>;

function isResponse(e: unknown): e is Response {
  return ResponseSchema.safeParse(e).success;
}

export const searchUser = async (
  term: string,
  size: number,
  cursor?: number
): Promise<Response> => {
  const res = await axiosInstance.get("/api/users", {
    params: { query: term, cursor: cursor ?? null, size },
  });
  const data = res.data;
  if (isResponse(data)) {
    return data;
  }
  throw new Error();
};
