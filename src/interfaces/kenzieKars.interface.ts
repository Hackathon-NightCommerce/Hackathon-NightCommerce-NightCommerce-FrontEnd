import z from "zod";
import { kenzieKarsSchema } from "../schemas/kenzieKars.schema";

export type TKenzieKars = z.infer<typeof kenzieKarsSchema>;
