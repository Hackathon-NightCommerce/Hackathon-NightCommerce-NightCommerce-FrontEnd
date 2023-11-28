import StyledFooter from "./style";
import Logo from "../../assets/logo-nome.png";
import { IoIosArrowUp } from "react-icons/io";
import { Box,   Link, Text } from "@chakra-ui/react";

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
      <StyledFooter>
        <img src={Logo} />
        <p>© 2023 - Todos os direitos reservados.</p>
        <Link href="/about">Equipe de desenvolvimento</Link>
        <button onClick={scrollToTop}>
          <IoIosArrowUp color="white" />
        </button>
      </StyledFooter>
      <Box className="social" backgroundColor={"#fff"}></Box>
    </Box>
  );
};
