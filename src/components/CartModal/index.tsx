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
  Spinner,
} from "@chakra-ui/react";
import { useProduct } from "../../hooks/useProduct";
import { ItemCart } from "../ItemCart";
import { useEffect } from "react";
import { MdAttachMoney } from "react-icons/md";
import { TAdvertItensCart } from "../../interfaces/advert.interface";
import { CartShemaRequest } from "../../interfaces/cart.interfaces";

interface CartModalProps {
  onCloseCart: () => void;
  isOpenCart: boolean;
}

export const CartModal = ({ onCloseCart, isOpenCart }: CartModalProps) => {
  const { onCart, total, setTotal, createCart, payment, spinnerCart } =
    useProduct();

  useEffect(() => {
    const arrayPrice: number[] = [];

    onCart.map((item) => {
      if (item.itemCart === undefined) {
        arrayPrice.push(Number(item.price));
      } else {
        arrayPrice.push(Number(item.price) * item.itemCart);
      }
    });
    const total = arrayPrice.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct;
    }, 0);

    setTotal(total);
  }, [onCart]);

  const onSubmitSalveCart = async (products: TAdvertItensCart[]) => {
    const salveNewproductsCart: CartShemaRequest = {
      products: products.map((product) => ({
        advert_id: product.id,
        name: product.name,
        qtd: Number(product.itemCart),
        price: Number(product.price),
      })),
    };
    await createCart(salveNewproductsCart);
  };

  const onSubmitPayment = async (products: TAdvertItensCart[]) => {
    const paymentNewproducts: CartShemaRequest = {
      products: products.map((product) => ({
        advert_id: product.id,
        name: product.name,
        qtd: Number(product.itemCart),
        price: Number(product.price),
      })),
    };
    await payment(paymentNewproducts);
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
            {onCart?.map((item) => (
              <ItemCart key={item.id} item={item} />
            ))}
          </Box>
        </ModalBody>
        <Box
          as="div"
          padding={"20px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <b>Total</b>

          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdAttachMoney />
            {total.toFixed(2)}
          </span>
        </Box>
        <ModalFooter>
          <Button variant="ghost" onClick={onCloseCart}>
            Fechar
          </Button>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => onSubmitSalveCart(onCart)}
          >
            Salvar carrinho
          </Button>
          {spinnerCart ? (
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          ) : (
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => onSubmitPayment(onCart)}
            >
              Comprar
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
