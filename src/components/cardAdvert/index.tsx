import {
  Card,
  CardBody,
  Image,
  Box,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import image404 from "../../assets/image404.png";
import discountImage from "../../assets/$.png";
import { useNavigate, useParams } from "react-router-dom";

import { TAdvert } from "../../schemas/advert.schema";
import { BottomLogicView } from "../Buttons/BottomLogicView";
import { useProduct } from "../../hooks/useProduct";

interface ICardProps {
  advert: TAdvert;
  typeView: "owner" | "admin" | "visitor" | null;
}

export const CardAdvert = ({ advert, typeView }: ICardProps) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const { onCart, setOnCart } = useProduct();

  const productAlreadyExist = (advert: TAdvert) => {
    const findItem = onCart.find((item: any) => item.id === advert.id);

    if (findItem !== undefined) {
      // Se o item já existe no carrinho, atualize apenas a quantidade
      setOnCart((prevItems: any) => {
        return prevItems.map((item: any) => {
          if (item.id === advert.id) {
            return {
              ...item,
              quantItem: item.quantItem + 1,
            };
          }
          return item;
        });
      });
    } else {
      // Se o item não existe no carrinho, adicione-o ao carrinho
      const newItem = {
        ...advert,
        quantItem: 1,
      };
      setOnCart((prevItems: any) => [...prevItems, newItem]);
    }
  };

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
          <Box
            className="price-buy"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="md" fontWeight={"bold"}>
              R$ {advert.price}
            </Text>

            <Button
              type="button"
              onClick={async (e) => {
                e.stopPropagation();
                productAlreadyExist(advert);
              }}
            >
              Adicionar
            </Button>
          </Box>
        </Box>
      </CardBody>
      <BottomLogicView
        typeView={typeView}
        idAdvert={advert.id}
        idUser={String(id)}
      />
    </Card>
  );
};
