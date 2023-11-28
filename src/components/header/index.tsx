import {
  Box,
  Container,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Logo from "../../assets/logo-nome.png";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CartModal } from "../CartModal";
import { useEffect, useState } from "react";
import { useProduct } from "../../hooks/useProduct";

interface HeaderProps {
  children?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Header({ children }: HeaderProps) {
  const { getAdvertsSherad } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getProductsSalveAtCart} = useProduct();

  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      getAdvertsSherad(searchTerm);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const {
    isOpen: isOpenCart,
    onOpen: onOpenCart,
    onClose: onCloseCart,
  } = useDisclosure();

  const [isLargeThan769] = useMediaQuery("(min-width: 769px)");

  useEffect(()=>{
    
    getProductsSalveAtCart()
    
  },[])

  return (
    <Box as={"header"} position={"relative"} backgroundColor={"var(--brand1)"} zIndex={100}>
      <Container
        maxWidth={"1300px"}
        height={isLargeThan769 ? "100px" : "164px"}
        padding={"10px"}
        display={isLargeThan769 ? "flex" : "inherit"}
        alignItems={isLargeThan769 ? "center" : "inherit"}
        justifyContent={"space-between"}
        gap={isLargeThan769 ? "10px" : "inherit"}
      >
        <Box
          className="logo"
          height={"33.333%"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link to={"/"}>
            <Image src={Logo} alt="logo" height={"30px"} minWidth={"216px"} />
          </Link>
        </Box>

        <InputGroup
          color={"#B0A6F0"}
          maxWidth={isLargeThan769 ? "670px" : "inherit"}
          alignItems="center"
        >
          <Input
            placeholder="Pesquisar..."
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            focusBorderColor={"white"}
            color={"white"}
          />
          <InputRightElement display="flex" align-item="flex-start">
            <CiSearch
              fontSize={"25px"}
              color="white"
              onClick={() => getAdvertsSherad(searchTerm)}
            />
          </InputRightElement>
        </InputGroup>

        <Box
          className="location-user-cart"
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={5}
        >
          <Box
            className="location"
            onClick={onOpen}
            height={"33.333%"}
            display="flex"
            alignItems="center"
            paddingLeft="1rem"
            minWidth={"120px"}
          >
            <FaMapMarkerAlt color="white" fontSize={"20px"} />
            <Text as="p" color="gray.500" paddingLeft={"1rem"}>
              Informe seu CEP...
            </Text>
          </Box>
          <Box
            className="card-user"
            display={"flex"}
            alignItems={"center"}
            gap={"20px"}
            cursor={"pointer"}
          >
            <IoCartOutline
              onClick={onOpenCart}
              color="white"
              style={{ fontSize: "40px" }}
            />
            {children}
          </Box>
        </Box>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg={"var(--random6)"}
          width={"300px"}
          position={"fixed"}
          top={"0"}
          right={"0"}
          margin={"0"}
          borderRadius={"none"}
          height={"100vh"}
          color={"white"}
        >
          <ModalBody display={"flex"} flexDir={"column"} gap={"15px"}>
            <Text fontSize={"md"}>
              A gente ajuda a encontrar o seu produto com menor frete e prazo de
              entrega.
            </Text>
            <Text fontSize={"md"}>Digite seu CEP</Text>
            <InputGroup>
              <Input
                width={"120px"}
                type="text"
                placeholder="_____-___"
                pattern="\d{5}-\d{3}"
                border="white 1px solid"
                _placeholder={{ color: "white" }}
              />
            </InputGroup>
          </ModalBody>
        </ModalContent>
      </Modal>
      <CartModal onCloseCart={onCloseCart} isOpenCart={isOpenCart} />
    </Box>
  );
}

export default Header;
