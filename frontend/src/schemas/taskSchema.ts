import { z } from "zod";

export const taskSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z.string().optional().nullable(),
  status: z.enum(["todo", "in_progress", "done"]).default("todo"),
  due_date: z.string().optional().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
