import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react"
import { StyledMenu } from "./style"
import { useMediaQuery } from "@chakra-ui/media-query"
import { AiOutlineMenu } from "react-icons/ai"
import Logo from "../../assets/logo_1.png"
import { Link } from "react-router-dom"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Header({ children }: any) {
  const [isWideScreen] = useMediaQuery("(min-width: 600px)")

  return (
    <header>
      <StyledMenu>
        <Link to={"/"}>
          <img src={Logo} />
        </Link>
        {isWideScreen ? (
          children
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<AiOutlineMenu />}
              variant="outline"
            />
            <MenuList
              bg={"var(--whiteFixed)"}
              width={"100vw"}
              zIndex={2}
              display={"flex"}
              padding={"10px"}
              flexDirection={"column"}
              boxShadow={"0 5px 3px rgba(0,0,0,0.3)"}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={"0 0 8px 8px"}
            >
              {children}
            </MenuList>
          </Menu>
        )}
      </StyledMenu>
    </header>
  )
}

export default Header
