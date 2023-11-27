import { Box, Spinner } from '@chakra-ui/react'
import {useUser} from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

export const ConfirmAccount = ()=>{
    const {confirmAccount} = useUser();
    const {id} = useParams();
    const [spinnerAccount, setSpinnerAccount] = useState<boolean>(true)

    const navigate = useNavigate()

    useEffect(()=>{
        async function confirm (){
            const result= await confirmAccount(Number(id));
            if(result?.data == 'Parabens sua conta foi confirmado com sucesso'){
                setTimeout(() => {setSpinnerAccount(false)}, 2000)
                setTimeout(() => {navigate('/login')}, 3000)
            }
        }
        confirm()
    },[])

    return(
        <>
           <Box
            width={330}
            height={250}
          
            margin={'auto'}
            marginTop={50}
            borderRadius={10}
            padding={'10px'}
            display={'flex'}
            

           >
            {spinnerAccount ? 
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='lg'
                width={150}
                height={150}
                margin={'auto'}
            />:
            <h1
            style={{
                color:'var(--sucess1)',
                fontWeight:'bold',
                textAlign:'center',
                fontSize:'20px'
            }}
            >
            Conta confirmado com sucesso
            </h1>
            
            }

           </Box><br/><br/>
        </>
    )
}