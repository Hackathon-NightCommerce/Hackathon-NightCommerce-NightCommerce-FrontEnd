import {StyledContainerRecoverPassword,StyledMain} from './style';
import {InputValidator} from '../../components/inputs';
import { useForm, SubmitHandler} from 'react-hook-form';
import {schema} from './validators';
import { zodResolver } from '@hookform/resolvers/zod';
import {RecoverPasswordData} from '../../interfaces/recoverPassword.interface';
import { useParams } from 'react-router-dom';
import { useUser } from '../../hooks/useProduct';

const recoverPassword = ()=>{

    const {token} = useParams();
    const { updateForgoutPassword} = useUser()

    const {register,handleSubmit, formState: {errors},} = useForm<RecoverPasswordData>({
        resolver:zodResolver(schema)
    })

    const sumbit:SubmitHandler<RecoverPasswordData> = async(data)=>{
        updateForgoutPassword(data.password,token!)
    }

    return(
             <StyledMain>

                <StyledContainerRecoverPassword onSubmit={handleSubmit(sumbit)}>
                    <h1>Nova Senha</h1><br/><br/>
                    
                    <InputValidator 
                    id='password' 
                    type='password' 
                    placeholder='Nova Senha' 
                    label='Senha' 
                    {...register('password')} 
                    error={errors.password?.message} /> 
                    
                    <InputValidator 
                    id='checkPassword' 
                    type='password' 
                    placeholder='Confirmar Senha' 
                    label='Confirmar Senha'{...register('checkPassword')} 
                    error={errors.checkPassword?.message}/> 

                    <button>Enviar</button>
                </StyledContainerRecoverPassword>

             </StyledMain>

    )
}

export default recoverPassword;