import RoutePages from "./routes"
import { GlobalStyle } from "./styles/GlobalStyled"
import ResetCSS from "./styles/ResetCSS"
import { ChakraProvider } from "@chakra-ui/react"
import { Footer } from "./components/footer/index"
import { Header } from "./components/header/index"
import { useUser } from "./hooks/useProduct"
import { UserHeader } from "./components/userHeader/index"
import { LoginRegisterButtons } from "./components/Buttons/LoginAndRegister/index"
import { extendTheme } from "@chakra-ui/react"

export function App() {
  const { user } = useUser()

  const breakpoints = {
    base: "0px",
    sm: "600px",
    md: "1000px",
    lg: "1200px",
  }

  const theme = extendTheme({
    breakpoints,
    styles: {
      global: {
        body: {
          bg: "#F1F3F5",
        },
      },
    },
  })
  return (
    <>
      <ChakraProvider theme={theme}>
        <Header>{user ? <UserHeader /> : <LoginRegisterButtons />}</Header>
        <ResetCSS />
        <GlobalStyle />
        <RoutePages />
        <Footer />
      </ChakraProvider>
    </>
  )
}
