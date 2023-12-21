import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  status: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  title: z.string().optional(),
  label: z.string().optional(),
  priority: z.string().optional(),
});

export type Task = z.infer<typeof taskSchema>;
