import {z} from 'zod';
import {cartSchemaRequest} from '../schemas/cart.schema';

export type CartShemaRequest = z.infer<typeof cartSchemaRequest>