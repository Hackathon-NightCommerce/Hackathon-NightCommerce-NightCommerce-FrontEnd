import { StyledFormForgoutPassword } from './style';
import { InputValidator } from '../inputs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {FormForgoutPasswordRequest,schema} from './validators';
import { useUser } from '../../hooks/useProduct';


export const FormForgoutPassword = () => {
    
    const { register, handleSubmit, formState: { errors },} = useForm<FormForgoutPasswordRequest>({
        resolver: zodResolver(schema),
    })

    const { sendEmail,setForgotPassword} = useUser()

    const submit: SubmitHandler<FormForgoutPasswordRequest> = async (email) => {
        sendEmail(email.email)
    }

    return (
        <StyledFormForgoutPassword onSubmit={handleSubmit(submit)}>
            <InputValidator
                id="email"
                label="Digite um Email existente na plataforma:"
                type="email"
                placeholder="Digite seu Email"
                error={errors.email?.message}
                {...register("email", { required: "Digite e-mail." })}
            />
            <div className="buttonsForgoutPassword">

                <button className="buttonVoltar" type='button' onClick={()=>setForgotPassword(true)}>Voltar</button>
                <button className="buttonSubmit" type='submit'>Enviar</button><br />

            </div>
        </StyledFormForgoutPassword>
    )
}