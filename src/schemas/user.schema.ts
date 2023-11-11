import z from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  phone: z.string(),
  birth_date: z.date(),
  description: z.string(),
  password: z.string(),
  type_user: z.enum(["seller", "admin", "client"]),
  address: z.object({
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    road: z.string(),
    number: z.string(),
    complement: z.string(),
  })
});


export const userUpdateSchema = z.object({
  name: z.string().min(4, "Minimo de 4 Caracteres."),
  email: z.string().email().optional(),
  phone: z.string(),
  description: z.string().max(210),
  address: z.object({
    cep: z.string().min(8, "CEP deve conter 8 caracteres"),
    state: z.string().nonempty("Estado é Obrigatorio"),
    city: z.string().nonempty("Deve conter uma cidade"),
    road: z.string().nonempty("DEve conter uma Rua Valida"),
    number: z.string().nonempty("Numero da casa e obrigatorio"),
    complement: z.string(),
  }),
})
  ;

export const userRegisterSchema = z.object({
  name: z.string().min(4, "Minimo de 4 Caracteres."),
  email: z.string().email("Email obrigatório."),
  cpf: z.string().regex(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/i,
    "CPF inválido. Ex: 000.000.000-00"
  ),
  phone: z.string().max(11,"Numero Precisar se valido"),
  birth_date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/i,
    "Formato de data de nascimento inválido Ex: 0000-00-00 ."
  ),
  description: z.string().max(210),
  password: z.string(),
  confirm_password: z.string().nonempty("Confirm password is required"),
  type_user: z.enum(["customer", "admin", "seller"]),
  address: z.object({
    cep: z.string().min(8, "CEP deve conter 8 caracteres"),
    state: z.string().nonempty("Estado é Obrigatorio"),
    city: z.string().nonempty("Deve conter uma cidade"),
    road: z.string().nonempty("DEve conter uma Rua Valida"),
    number: z.string().nonempty("Numero da casa e obrigatorio"),
    complement: z.string(),
  }),
})
  .refine(({ password, confirm_password }) => password === confirm_password, {
    message: "As senhas não correspondem",
    path: ["confirm_password"],
  })
  .transform((data) => ({
    ...data,
    address: {
      ...data.address,
    },
  }))
