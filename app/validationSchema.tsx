import z from "zod";

export const goalSchema = z.object({
  title: z.string().min(1, "Title is required").max(1000),
  description: z.string().min(1, "Description is required").max(5000),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(1000),
  description: z.string().min(1, "Description is required").max(5000),
  imgUrl: z.string().min(1).max(5000),
});
