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
import { useEffect, useState } from "react";
import { TAdvert, TAdvertItensCart } from "../../interfaces/advert.interface";
import { useProduct } from "../../hooks/useProduct";

type TItemprops = {
  item: TAdvertItensCart;
};



export const ItemCart = ({ item }: TItemprops) => {

  const { onCart,setOnCart,setTotal} = useProduct();
  const [qtdItem,setQtdItem] = useState<number>(item.itemCart);


  const removerItensCart = (idCart: number) => {
    const updatedCart = onCart.filter(item => item.id !== idCart);
    setOnCart(updatedCart);
  };

  useEffect(()=>{
    item.itemCart = qtdItem
    const arrayPrice: number[] = [] 

    onCart.map((item)=>{
      
      if(item.itemCart === undefined){
        arrayPrice.push(Number(item.price))
        
      }else{
        arrayPrice.push(Number(item.price) * item.itemCart)
        
      }
    })
    const total = arrayPrice.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct;
    }, 0);

    setTotal(total)

  },[qtdItem])
  
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
          onClick={()=>setQtdItem(qtdItem - 1 === 0 ? qtdItem : qtdItem - 1)}
          aria-label="Remove"
          icon={<MinusIcon />}
        />
        <Button>{qtdItem}</Button>
        <IconButton
          onClick={()=>setQtdItem(qtdItem + 1)}
          aria-label="Add"
          icon={<AddIcon />}
        />
        <button
        onClick={()=>removerItensCart(item.id)}
        >
          Remover
        </button>
      </ButtonGroup>
    </Box>
  );
};
