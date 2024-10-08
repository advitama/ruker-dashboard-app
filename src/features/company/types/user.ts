import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  role: z.string(),
});

export type User = z.infer<typeof userSchema>;
