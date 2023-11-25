import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useProduct } from "../../hooks/useProduct";
import { ItemCart } from "../ItemCart";

export const CartModal = ({ onCloseCart, isOpenCart }: any) => {
  const { onCart } = useProduct();

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
            {onCart?.map((item) => (
              <ItemCart key={item.id} item={item} />
            ))}
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
