import RoutePages from "./routes"
import { GlobalStyle } from "./styles/GlobalStyled"
import ResetCSS from "./styles/ResetCSS"
import { ChakraProvider } from "@chakra-ui/react"
import { Footer } from "./components/footer/index"
import { Header } from "./components/header/index"
import { extendTheme } from "@chakra-ui/react"
import { ProfileButton } from "./components/ProfileButton/ProfileButton"

export function App() {

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
        <Header><ProfileButton/></Header>
        <ResetCSS />
        <GlobalStyle />
        <RoutePages />
        <Footer />
      </ChakraProvider>
    </>
  )
}
