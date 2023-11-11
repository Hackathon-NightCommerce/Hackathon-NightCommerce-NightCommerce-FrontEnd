import {
  Card,
  CardBody,
  CardFooter,
  Image,
  ListItem,
  Box,
  Tag,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react"
import { TAdvert } from "../../schemas/advert.schema"
import image404 from "../../assets/image404.png"

interface ICardProps {
  advert: TAdvert
  typeView: "owner" | "admin" | "visitor" | null
}
import discountImage from "../../assets/$.png"
import { useNavigate, useParams } from "react-router-dom"
import { BottomLogicView } from "../Buttons/BottomLogicView"

export function CardAdvert({ advert, typeView }: ICardProps) {
  const navigate = useNavigate()
  const brandName = advert.brand[0].toUpperCase() + advert.brand.slice(1)
  const modelName = (
    advert.model[0].toUpperCase() + advert.model.slice(1)
  ).split(" ")[0]
  const { id } = useParams();
  
  return (
    <ListItem
      color={`var(--grey1)`}
      width={"312px"}
      height={"350px"}
      flexShrink={"0"}
      borderRadius={"10px"}
      onClick={() => {
        navigate(`/product/${advert.id}`)
      }}
    >
      <Card
        display={"flex"}
        flexDirection={"column"}
        gap={"1rem"}
        width={"100%"}
        height={"100%"}
        transition={"0.5s"}
        cursor={"pointer"}
        borderRadius={"10px"}
      >
        <CardBody
          display={"flex"}
          flexDirection={"column"}
          gap={"15px"}
          padding={"0"}
        >
          {advert.table_fipe ? (
            <Box
              backgroundColor={"green"}
              position={"absolute"}
              top={"0"}
              right={"0"}
              zIndex={"1"}
              transition={"0.5s"}
              display={"flex"}
              gap={"0.5rem"}
              padding={"0.2rem 0.5rem"}
              borderRadius={"0 10px 0 0"}
            >
              <Text
                display={"none"}
                color={"var(--grey9)"}
                backgroundColor={"green"}
              >
                Abaixo do preço
              </Text>
              <Image src={discountImage} width={"15px"} />
            </Box>
          ) : null}
          <Image
            src={advert.cover_image ? advert.cover_image : image404}
            alt={`${advert.model}  ${advert.brand}`}
            height={"144px"}
            width={"100%"}
            objectFit="cover"
            backgroundColor={`var(--grey7)`}
            borderRadius={" 10px 10px 0 0px"}
          />
          <Container>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              width={"100%"}
              height={"175px"}
            >
              <Heading as="h3" size="md">
                {brandName} - {modelName}
              </Heading>

              <Text
                fontSize="md"
                color={`var(--grey2)`}
                lineHeight={"1.5rem"}
                textAlign={"left"}
                height={"48px"}
                overflow="hidden"
                display="-webkit-box"
                style={{
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {advert.description.length > 120
                  ? advert.description.slice(0, 80) + "..."
                  : advert.description}
              </Text>

              {advert.user?.name && (
                <Box
                  onClick={(event) => {
                    event.stopPropagation()
                    navigate(`/profile/${advert.user.id}`)
                  }}
                  display={"flex"}
                  gap={"1rem"}
                  justifyItems={"center"}
                  alignItems={"center"}
                >
                  <Box
                    backgroundColor={`var(--random2)`}
                    borderRadius={"20px"}
                    display={"flex"}
                    width={"25px"}
                    height={"25px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    fontWeight={"bold"}
                  >
                    <Text fontSize="xs" color={`var(--grey10)`}>
                      {advert.user.name[0].toUpperCase()}
                    </Text>
                  </Box>
                  <Text fontSize="xs" color={`var(--grey2)`}>
                    {advert.user.name}
                  </Text>
                </Box>
              )}
              <CardFooter
                display={"flex"}
                justifyContent={"space-between"}
                width={"100%"}
                alignItems={"center"}
                padding={"0"}
              >
                <Container
                  display={"flex"}
                  justifyContent={"space-between"}
                  padding={"0"}
                >
                  <Box display={"flex"} gap={"1rem"} width={"50%"}>
                    <Tag
                      color={`var(--brand1)`}
                      backgroundColor={`var(--brand4)`}
                      padding={"0.4rem"}
                      borderRadius={"5px"}
                      size="sm"
                      fontWeight={"bold"}
                    >
                      {advert.mileage} KM
                    </Tag>

                    <Tag
                      color={`var(--brand1)`}
                      backgroundColor={`var(--brand4)`}
                      padding={"0.4rem"}
                      borderRadius={"5px"}
                      size="sm"
                      fontSize={"sm"}
                      fontWeight={"bold"}
                    >
                      {advert.year}
                    </Tag>
                  </Box>

                  <Text
                    fontSize="md"
                    fontWeight={"bold"}
                    width={"50%"}
                    textAlign={"right"}
                  >
                    R$ {advert.price}
                  </Text>
                </Container>
              </CardFooter>
              <BottomLogicView typeView={typeView} idAdvert={advert.id} idUser={String(id)} />
            </Box>
          </Container>
        </CardBody>
      </Card>
    </ListItem>
  )
}
