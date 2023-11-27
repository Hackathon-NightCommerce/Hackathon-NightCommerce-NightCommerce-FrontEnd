import z, { date } from "zod"
import { userSchema } from "./user.schema"

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
})

const commentsSchema = z.object({
  id: z.number(),
  comment: z.string(),
  stars:z.number(),
  created_at: z.string(),
  user: z.object({
    id:z.number(),
    name: z.string(),
  }),
})

export enum CategoryProduct {
  Informatica = "Informatica",
  Notekook = "Notebook",
  Impressoras = "Impressoras",
  SmartPhones = "SmartPhones",
  Domestico = "Domestico",
  Tvs = "Tvs",
  Outros = "Outros",
}

export const advertSchema = z.object({
  id: z.number(),
  name: z.string().refine(data => data.length > 0, {
    message: "Por favor, forneça um nome válido para o produto.",
  }),

  brand: z.string().refine(data => data.length > 0, {
    message: "Por favor, forneça o nome da marca do produto",
  }),

  price: z.string().refine(data=>data.length > 0,{
      message:'Por favor, o preço minimo e 1 real'
  }).or(z.number()),

  description: z.string(),

  cover_image: z.string().refine(data=>data.length > 0,{
    message:'Por favor, adicione uma imagem de capa'
  }),

  information_additional: z.string(),
  category: z.nativeEnum(CategoryProduct),
  published: z.boolean(),
  qtd: z.string().refine(data=>data.length > 0,{
    message:'Por favor, quantidade minima de 1 unidade'
}).or(z.number().min(1)),

  promotion: z.boolean(),
  // images: z.array(imageGallerySchema),
  comments: z.array(commentsSchema),
  user: userSchema,
})

export const AdvertSchemaToItensCart = advertSchema.extend({
 itemCart: z.number()
})

export const advertSchemaValidator = advertSchema
  .omit({
    id: true,
    user: true,
    comments: true,
  })
  .extend({
    images: z.array(z.string()).optional(),
  })

export const createAdvertSchemaValidator = advertSchema
  .omit({
    id: true,
    user: true,
    comments: true,
  })
  .extend({
    images: z.array(z.string()).optional(),
  })

export type TAdvert = z.infer<typeof advertSchema>

export const updateAdvertSchema = createAdvertSchemaValidator
  .partial()
  .extend({ images: z.array(imageGallerySchema).or(z.array(z.string())).optional() })

export type TUpdateAdvert = z.infer<typeof updateAdvertSchema>
