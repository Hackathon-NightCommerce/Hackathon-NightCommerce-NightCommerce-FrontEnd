import z from "zod";

export const kenzieKarsSchema = z.object({
  id: z.string(),
  name: z.string(),
  brand: z.string(),
  year: z.number().or(z.string()),
  fuel: z.number().or(z.string()),
  value: z.number().or(z.string()),
});
