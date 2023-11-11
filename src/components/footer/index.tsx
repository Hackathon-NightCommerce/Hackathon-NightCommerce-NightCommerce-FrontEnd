import StyledFooter from './style';
import Logo from '../../assets/logo_2.png';
import {IoIosArrowUp} from 'react-icons/io';
import { Link } from '@chakra-ui/react';

export function Footer() {

    const scrollToTop = ()=>{
        window.scrollTo({top:0, behavior:'smooth'});
    }
    return (
        <StyledFooter>
            <img src={Logo}/>
            <p>© 2023 - Todos os direitos reservados.</p>
            <Link href='/about'>Equipe de desenvolvimento</Link>
            <button onClick={scrollToTop}>
                <IoIosArrowUp/>
            </button>
        </StyledFooter>
    )
}