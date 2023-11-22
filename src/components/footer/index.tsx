import StyledFooter from "./style";
import Logo from "../../assets/logo-nome.png";
import { IoIosArrowUp } from "react-icons/io";
import { Box, Container, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Box as={"footer"}>
      <Box
        className="central"
        backgroundColor={"#E7E7E7"}
        padding={"30px"}
        display={"flex"}
        gap={"30px"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
      >
        <Box>
          <Text as={"b"}>CENTRAL DE VENDAS</Text>
          <Text>Compre pelo Whatapp</Text>
        </Box>

        <Box textAlign={"center"}>
          <Text as={"b"}>CENTRAL DE ATENDIMENTO</Text>
          <Text>4004-2345</Text>
        </Box>
        <Text>Fale pelo Whatsapp</Text>
      </Box>

      <Box
        className="suport"
        backgroundColor={"#F5F5F5"}
        padding={"30px"}
        display={"flex"}
        gap={"20px"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
      >
        <Box>
          <Text as={"b"}>MEUS PEDIDOS</Text>
          <Text>Acompanhe seus pedidos</Text>
          <Text>Editar cadastro</Text>
        </Box>

        <Box>
          <Text as={"b"}>Night Commerce</Text>
          <Text>MEUS PEDIDOS</Text>
          <Text>Acompanhe seus pedidos</Text>
          <Text>Editar cadastro</Text>
          <Text>Quem somos</Text>
          <Text>Serviços</Text>
          <Text>Lista de presentes</Text>
          <Text>Trabalhe conosco</Text>
          <Text>Venda seus produtos</Text>
          <Text>Black Friday</Text>
          <Text>Web stories</Text>
        </Box>

        <Box>
          <Text as={"b"}>AJUDA</Text>
          <Text>Mapa do site</Text>
          <Text>Atendimento em libras</Text>
          <Text>Prazos e locais de entregas</Text>
          <Text>Política de troca e devolução</Text>
          <Text>Quantidade de itens por periodo</Text>
          <Text>Portal de privacidade</Text>
          <Text>Política de privacidade</Text>
          <Text>Termos e condições de uso</Text>
          <Text>Segurança digital</Text>
        </Box>
      </Box>

      <Box className="social" backgroundColor={"#fff"}></Box>
    </Box>
    // <StyledFooter>
    //   <img src={Logo} />
    //   <p>© 2023 - Todos os direitos reservados.</p>
    //   <Link href="/about">Equipe de desenvolvimento</Link>
    //   <button onClick={scrollToTop}>
    //     <IoIosArrowUp />
    //   </button>
    // </StyledFooter>
  );
};
