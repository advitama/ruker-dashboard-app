import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
