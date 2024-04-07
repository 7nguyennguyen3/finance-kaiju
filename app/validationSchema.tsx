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

export const credentialSchema = z.object({
  name: z.string().min(1, "Name is required").max(1000),
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Minimum 8 characters is required").max(5000),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email(),
  password: z.string().min(8, "Minimum 8 characters is required").max(5000),
});
