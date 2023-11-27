import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useUser } from "./../../hooks/useProduct";
import { FormEditUser } from "./../formEditUser/index";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StyledUserHeader } from "./style";
import { RiUserSettingsLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { FaPager } from "react-icons/fa";

export const UserHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, getUser, deleteUser, logoutUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <StyledUserHeader>
      <Menu>
        <MenuButton
          as={Button}
          colorScheme="messenger"
          variant="ghost"
          height={"100%"}
          borderRadius={"0"}
          borderLeft={"solid 2px var(--grey6)"}
          display={"flex"}
          color={"#EDEAFD"}
          fontSize={22}
          _hover={{
            bg: "var(--brand1)",
            color: "white",
          }}
        >
          {user?.name.split(" ")[0]}
        </MenuButton>
        <MenuList
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <MenuItem onClick={onOpen} display="flex" gap={5} color="#4529E6">
            <RiUserSettingsLine color="#4529E6" style={{ fontSize: "25px" }} />
            Editar Usuario
          </MenuItem>
          {user?.type_user == "seller" && (
            <MenuItem
              onClick={() => navigate(`/profile/${user?.id}`)}
              display="flex"
              gap={5}
              color="#4529E6"
            >
              <FaPager color="#4529E6" style={{ fontSize: "25px" }} />
              Meus Anuncios
            </MenuItem>
          )}
          <MenuItem onClick={logoutUser} display="flex" gap={5} color="#4529E6">
            <BiLogOut color="#4529E6" style={{ fontSize: "25px" }} />
            Sair
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"520px"}>
          <ModalHeader>Editar Usuario</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormEditUser onClose={onClose}>
              <Button
                width={"40%"}
                mr={3}
                onClick={onClose}
                borderRadius={"10px"}
              >
                Cancelar
              </Button>
              {user?.type_user !== "admin" ? (
                <Button
                  onClick={() => {
                    deleteUser();
                    onClose();
                    logoutUser();
                  }}
                  width="40%"
                  mr={3}
                  backgroundColor="var(--alert1)"
                  color="var(--grey8)"
                  borderRadius="10px"
                  border="1px solid var(--alert1)"
                  transition="0.5s"
                  _hover={{
                    bg: "transparent",
                    color: "var(--alert1)",
                    transition: "0.5s",
                  }}
                >
                  Excluir Perfil
                </Button>
              ) : (
                <></>
              )}
            </FormEditUser>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </StyledUserHeader>
  );
};
