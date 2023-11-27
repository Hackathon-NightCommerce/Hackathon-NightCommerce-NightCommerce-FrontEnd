import { z } from "zod";
import { userUpdateSchema } from "../schemas/user.schema";
import { userSchema, userRegisterSchema,userSchemaResponseItemsCart} from './../schemas/user.schema';

export type TUser = z.infer<typeof userSchema>

export type TUpdateUser = z.infer<typeof userUpdateSchema>;

export type TRegisterUser = z.infer<typeof userRegisterSchema>

export type TProductsUserSalveAtCart = z.infer<typeof userSchemaResponseItemsCart>;