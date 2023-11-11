import z from "zod"
import { userSchema } from "./user.schema"

export const imageGallerySchema = z.object({
  id: z.number(),
  image: z.string(),
})

const commentsSchema = z.object({
  id: z.number(),
  comment: z.string(),
  created_at: z.string(),
  user: z.object({
    id:z.number(),
    name: z.string(),
  }),
})

export const advertSchema = z.object({
  id: z.number(),
  brand: z.string(),
  model: z.string(),
  year: z.number().or(z.string()),
  fuel: z.string(),
  mileage: z.number().or(z.string()),
  color: z.string(),
  table_fipe: z.boolean(),
  price: z.number().or(z.string()),
  description: z.string(),
  cover_image: z.string(),
  published: z.boolean().optional(),
  images: z.array(imageGallerySchema),
  comments: z.array(commentsSchema),
  user: userSchema,
})

export const advertSchemaValidator = advertSchema
  .omit({
    id: true,
    user: true,
    table_fipe: true,
    fuel: true,
    year: true,
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
  .extend({ images: z.array(imageGallerySchema).or(z.array(z.string())) })

export type TUpdateAdvert = z.infer<typeof updateAdvertSchema>
