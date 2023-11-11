import {schema} from '../pages/RecoverPassword/validators';
import { z } from "zod";

export type RecoverPasswordData = z.infer<typeof schema>;