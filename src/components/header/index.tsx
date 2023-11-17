import {
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Logo from "../../assets/logo-nome.png";
import { Link } from "react-router-dom";
import { IoCartOutline, IoSearchCircleOutline } from "react-icons/io5";
import { FaMapMarkerAlt, FaRegUser } from "react-icons/fa";

export function Header({ children }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [isWideScreen] = useMediaQuery("(min-width: 600px)")
  return (
    <Box
      position={"relative"}
      as={"header"}
      backgroundColor={"var(--brand1)"}
      height={"164px"}
      padding={"8px"}
    >
      <Box
        className="logo-card-user"
        height={"33.333%"}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Link to={"/"}>
          <Image src={Logo} alt="logo" height={"30px"} />
        </Link>
        <Box
          className="card-user"
          display={"flex"}
          alignItems={"center"}
          gap={"10px"}
        >
          <IoCartOutline color="white" style={{ fontSize: "40px" }} />
          <FaRegUser color="white" style={{ fontSize: "30px" }} />
        </Box>
      </Box>

      <InputGroup color={"white"} height={"33.333%"}>
        <Input placeholder="Pesquisar..." />
        <InputRightElement>
          <IoSearchCircleOutline fontSize={"40px"} color="white" />
        </InputRightElement>
      </InputGroup>

      <Box
        onClick={onOpen}
        className="location"
        height={"33.333%"}
        display="flex"
        alignItems="center"
        paddingLeft="1rem"
      >
        <FaMapMarkerAlt color="white" fontSize={"20px"} />
        <Text as="p" color="gray.500" paddingLeft={"1rem"}>
          Informe seu CEP...
        </Text>
      </Box>

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

      {/* {isWideScreen ? (
          children
        ) : (
        )} */}
    </Box>
  );
}

export default Header;
