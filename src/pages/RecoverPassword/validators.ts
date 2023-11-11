import {z} from 'zod';

export const schema = z.object({
    password: z.string().nonempty('Digite a senha'),
    checkPassword: z.string().nonempty('Confirme a senha')

}).refine((data)=>data.password === data.checkPassword,{
    
    message:'Senhas não iguais',
    path:['checkPassword']
})