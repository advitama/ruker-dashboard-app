import { z } from "zod";

export const companySchema = z.object({
  id: z.number(),
  name: z.string(),
  industry: z.string(),
});

export type Company = z.infer<typeof companySchema>;
