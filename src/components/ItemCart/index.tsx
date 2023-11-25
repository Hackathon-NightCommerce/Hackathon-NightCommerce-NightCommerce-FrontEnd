import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { TAdvert } from "../../interfaces/advert.interface";

type TItemprops = {
  item: TAdvert;
};

export const ItemCart = ({ item }: TItemprops) => {
  const [amount, setAmount] = useState(0);

  const stopOnZero = () => {
    if (amount == 0) {
      setAmount(0);
    } else {
      setAmount(amount - 1);
    }
  };

  const stopOnMax = () => {
    setAmount(amount + 1);
  };

  return (
    <Box
      as="li"
      height={"80px"}
      display={"flex"}
      justifyContent={"space-between"}
      gap={"10px"}
      alignItems={"center"}
    >
      <Image
        objectFit="cover"
        boxSize={"80px"}
        src={item.cover_image}
        alt={item.name}
      />
      <Heading size="sm">{item.name}</Heading>
      <Text>R$ {item.price}</Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        <IconButton
          onClick={stopOnZero}
          aria-label="Remove"
          icon={<MinusIcon />}
        />
        <Button>{amount}</Button>
        <IconButton onClick={stopOnMax} aria-label="Add" icon={<AddIcon />} />
      </ButtonGroup>
    </Box>
  );
};
