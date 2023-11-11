import { StyledHome, StyledBannerPageHome, StyledSection } from "./style"
import Banner from "../../assets/banner_bmw.png"
import { Button, ButtonGroup, Box} from "@chakra-ui/react"
import { useProduct, useUser } from "../../hooks/useProduct"
import { AsideFilters } from "../../components/aside"
import { StyledContainer } from "../../styles/Container"
import { useEffect } from "react"
import { ListCards } from "../../components/listCards"

function Home() {
  const { getAdverts, page, previusPage, nextPage, paginationByNumber, filters } = useProduct()
  const {  getUser } = useUser()

  useEffect(() => {
    getAdverts()
    getUser()
  }, [])

  const pages: number[] = []
  if (page) {
    for (let i = 0; i < page?.totalPages; i++) {
      pages.push(i + 1)
    }
  }

  return (

      <StyledHome>
        <StyledBannerPageHome>
          <img src={Banner} alt="Banner" />
          <h1>Web Custons</h1>

          <p>A melhor plataforma de anúncios de carros do pais</p>
        </StyledBannerPageHome>
        <br />
        <br />

        <StyledContainer>
          <AsideFilters />
          <StyledSection>
            <ListCards typeView={"visitor"} advertsList={page?.data} />
            <Box
              width={"100%"}
              display={"flex"}
              gap={"2rem"}
              justifyContent={"center"}
            >
              <ButtonGroup>
                {pages?.map((page) => (
                  <Button
                    key={`page_${page}`}
                    padding={"0 0.5rem"}
                    fontWeight={"bold"}
                    backgroundColor={"transparent"}
                    variant="link"
                    color={`var(--grey3)`}
                    transition={"0.5s"}
                    _hover={{
                      backgroundColor: "var(--grey8)",
                      color: "var(--grey1)",
                      borderBottom: "1px solid var(--grey1)",
                      transition: "0.5s",
                    }}
                    onClick={() => paginationByNumber(page,filters!)}
                  >
                    {page}
                  </Button>
                ))}
              </ButtonGroup>
              <ButtonGroup>
                {page?.prevPage && (
                  <Button
                    fontWeight={"bold"}
                    backgroundColor={"transparent"}
                    variant="link"
                    color={`var(--brand1)`}
                    onClick={()=>previusPage(filters!)}
                    cursor={"pointer"}
                    border={"1px solid transparent"}
                    transition={"0.5s"}
                    _hover={{
                      color: "var(--brand2)",
                      borderBottom: "1px solid var(--brand2)",
                      transition: "0.5s",
                    }}
                  >
                    Anterior
                  </Button>
                )}
                {page?.nextPage && (
                  <Button
                    fontWeight={"bold"}
                    backgroundColor={"transparent"}
                    variant="link"
                    color={`var(--brand1)`}
                    onClick={()=>nextPage(filters!)}
                    cursor={"pointer"}
                    border={"1px solid transparent"}
                    transition={"0.5s"}
                    _hover={{
                      color: "var(--brand2)",
                      borderBottom: "1px solid var(--brand2)",
                      transition: "0.5s",
                    }}
                  >
                    Seguinte
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </StyledSection>
        </StyledContainer>
      </StyledHome>

  )
}

export default Home
