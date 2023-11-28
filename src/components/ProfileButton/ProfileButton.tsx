import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { IoClipboard, IoLogIn, IoPerson } from "react-icons/io5";
import { useUser } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { UserHeader } from "../userHeader";
import { ButtonNavigate } from "./style";

export const ProfileButton = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  return user ? (
    <UserHeader />
  ) : (
    <Menu>
      <MenuButton as={Button}>
        <IoPerson color="#4529E6" style={{ fontSize: "25px" }} />
      </MenuButton>
      <MenuList>
        <ButtonNavigate
          className="login"
          type="submit"
          onClick={() => navigate("/login")}
          color="#4529E6"
        >
          <IoLogIn color="#4529E6" style={{ fontSize: "25px" }} />
          Fazer Login
        </ButtonNavigate>
        <ButtonNavigate
          className="register"
          type="submit"
          onClick={() => navigate("/register")}
          color="#4529E6"
        >
          <IoClipboard color="#4529E6" style={{ fontSize: "25px" }} />
          Cadastrar
        </ButtonNavigate>
      </MenuList>
    </Menu>
  );
};
