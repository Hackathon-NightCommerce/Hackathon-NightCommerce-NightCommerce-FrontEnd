import z from "zod";
import {
  advertSchema,
  advertSchemaValidator,
  createAdvertSchemaValidator,
  AdvertSchemaToItensCart
} from "../schemas/advert.schema";

export type TAdvert = z.infer<typeof advertSchema>;

export type TPagination = {
  prevPage: string | null;
  nextPage: string | null;
  totalPages: number;
  data: TAdvert[];
};

export type TAdverData = z.infer<typeof advertSchemaValidator>;
export type TCreateAdvertData = z.infer<typeof createAdvertSchemaValidator>;
export type TAdvertItensCart = z.infer<typeof AdvertSchemaToItensCart>;
