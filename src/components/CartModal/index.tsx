import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  List,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

export const CartModal = ({ onCloseCart, isOpenCart }: any) => {
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
    <Modal
      isCentered
      onClose={onCloseCart}
      isOpen={isOpenCart}
      motionPreset="slideInBottom"
      size={"lg"}
    >
      <ModalOverlay />
      <ModalContent borderRadius={"0"}>
        <ModalHeader backgroundColor={"var(--brand3)"}>
          Carrinho de compra
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="ul" display={"flex"} flexDirection={"column"} gap={"15px"}>
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
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Heading size="md">The perfect latte</Heading>
              <ButtonGroup size="sm" isAttached variant="outline">
                <IconButton
                  onClick={stopOnZero}
                  aria-label="Remove"
                  icon={<MinusIcon />}
                />
                <Button>{amount}</Button>
                <IconButton
                  onClick={stopOnMax}
                  aria-label="Add"
                  icon={<AddIcon />}
                />
              </ButtonGroup>
            </Box>
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
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />
              <Heading size="md">The perfect latte</Heading>
              <ButtonGroup size="sm" isAttached variant="outline">
                <IconButton
                  onClick={stopOnZero}
                  aria-label="Remove"
                  icon={<MinusIcon />}
                />
                <Button>{amount}</Button>
                <IconButton
                  onClick={stopOnMax}
                  aria-label="Add"
                  icon={<AddIcon />}
                />
              </ButtonGroup>
            </Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onCloseCart}>
            Fechar
          </Button>
          <Button colorScheme="blue" mr={3}>
            Comprar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
