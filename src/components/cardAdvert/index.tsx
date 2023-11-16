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

// import { TAdvert } from "../../schemas/advert.schema"

// interface ICardProps {
//   advert: TAdvert
//   typeView: "owner" | "admin" | "visitor" | null
// }

export const CardAdvert = (/*{ advert, typeView }: ICardProps*/) => {
  const navigate = useNavigate();

  // const { id } = useParams()

  const mockAdvert = {
    id: 1,
    name: "mouse",
    brand: "Red Dragon",
    price: 107.89,
    description:
      "Loren ipsum da bla car dsjdfd jfhksdjfhsdjfhjksdfhjksd fsdhlfsdfhsfshl",
    information_additional: "Informação adicional aqui, bla bal bla bla",
    category: "periféricos",
    cover_image:
      "https://a-static.mlcdn.com.br/280x210/mouse-gamer-x7-black-profissional-led-rgb-6000-dpi-usb-3-0-com-fio/santaclaradigital/15922213685/f0a0eb8e54be23c5b156d4a614804e6d.jpeg",
    published: "true",
    qtd: 20,
    promotion: "false",
    user_id: 1,
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
        navigate(`/product/${mockAdvert.id}`);
      }}
    >
      <CardBody
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        padding={"0"}
      >
        <Image
          src={mockAdvert.cover_image ? mockAdvert.cover_image : image404}
          alt={`${mockAdvert.name}  ${mockAdvert.brand}`}
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
          <Heading size="sm">Mouse red dragon o mio</Heading>
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
            {mockAdvert.description.length > 120
              ? mockAdvert.description.slice(0, 80) + "..."
              : mockAdvert.description}
          </Text>
          <Text
            fontSize="md"
            fontWeight={"bold"}
          >
            R$ {mockAdvert.price}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};
