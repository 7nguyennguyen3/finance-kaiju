import z from "zod";

export const goalSchema = z.object({
  title: z.string().min(1, "Title is required").max(1000),
  description: z.string().min(1, "Description is required").max(5000),
});
