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
  CardHeader,
} from "@chakra-ui/react";
import image404 from "../../assets/image404.png";
import discountImage from "../../assets/$.png";
import { useNavigate, useParams } from "react-router-dom";

import { TAdvert } from "../../schemas/advert.schema"
import { BottomLogicView } from "../Buttons/BottomLogicView";

interface ICardProps {
  advert: TAdvert
  typeView: "owner" | "admin" | "visitor" | null
}

export const CardAdvert = ({ advert, typeView }: ICardProps) => {
  const navigate = useNavigate();

  const { id } = useParams()

  return (
    <Card
      as="li"
      display={"flex"}
      flexDirection={"column"}
      gap={"1rem"}
      width={"250px"}
      height={"450px"}
      padding={"25px"}
      cursor={"pointer"}
      borderRadius={"10px"}
      _hover={{ border: "1px solid var(--brand1)" }}
      onClick={() => {
        navigate(`/product/${advert.id}`);
      }}
    >
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        padding={"0"}
      >
        <Image
          src={advert.cover_image ? advert.cover_image : image404}
          alt={`${advert.name}  ${advert.brand}`}
          height={"180px"}
          width={"180px"}
          objectFit="cover"
          backgroundColor={`var(--grey7)`}
          borderRadius={" 10px 10px 0 0px"}
        />
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"space-between"}
          width={"100%"}
          height={"175px"}
        >
          <Heading size="sm">{advert.name}</Heading>
          <span>⭐⭐⭐⭐⭐</span>
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
          <Text
            fontSize="md"
            fontWeight={"bold"}
          >
            R$ {advert.price}
          </Text>
        </Box>
      </CardBody>
      <BottomLogicView typeView={typeView} idAdvert={advert.id} idUser={String(id)} />
    </Card>
  );
};
