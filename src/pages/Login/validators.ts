import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Informe seu email."),
  password: z.string().nonempty("Senha obrigatória."),
});

export type LoginData = z.infer<typeof schema>;
