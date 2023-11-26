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
          onClick={item.quantItem - 1}
          aria-label="Remove"
          icon={<MinusIcon />}
        />
        <Button>{item.quantItem}</Button>
        <IconButton
          onClick={item.quantItem + 1}
          aria-label="Add"
          icon={<AddIcon />}
        />
      </ButtonGroup>
    </Box>
  );
};
