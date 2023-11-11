import { z } from "zod"
import { userSchema } from "./user.schema"
import { advertSchema } from "./advert.schema"

export const advertsByUserIdSchema = userSchema.extend({
  adverts: z.array(advertSchema),
})

export type IAdvertsByUserId = z.infer<typeof advertsByUserIdSchema>
