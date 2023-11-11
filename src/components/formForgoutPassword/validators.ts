import { z } from "zod";

export const schema = z.object({
    email: z.string().email("Informe seu email."),
});

export type FormForgoutPasswordRequest = z.infer<typeof schema>;