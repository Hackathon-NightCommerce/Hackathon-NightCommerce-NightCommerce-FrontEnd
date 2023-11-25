import {
  Card,
  CardBody,
  CardHeader,
  Box,
  ListItem,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { FormEditComment } from "../formEditComment";
import { useProduct, useUser } from "../../hooks/useProduct";
import Rating from 'react-rating-stars-component';
import { StyledStars } from "./style";

interface ICommentItemProps {
  name: string;
  created_at: string;
  comment: string;
  stars:number;
  idUserComment:number;
  idComment:number;
  idAdvert:number;
}
export const CommentItem = ({
  name,
  created_at,
  comment,
  stars,
  idUserComment,
  idComment,
  idAdvert,
}: ICommentItemProps) => {
  const dataISO8601 = created_at;

  const dataFornecida = new Date(dataISO8601);

  const dataAtual = new Date().getTime();

  const diferencaEmMilissegundos = dataAtual - dataFornecida.getTime();

  const diasPassados = Math.floor(
    diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
  );
  let dia = "dias";

  if (diasPassados > 1) {
    dia = "dias";
  } else {
    dia = "dia";
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const {user} = useUser();
  const { deleteComment} = useProduct();

  return (
    <ListItem>
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
        <CardHeader
          display="flex"
          flexDirection="row"
          gap="0.5rem"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems={"center"}
            gap={"0.5rem"}
          >
            <Box
              backgroundColor="var(--random2)"
              borderRadius="50%"
              display="flex"
              width={"30px"}
              height={"30px"}
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="mg">{name[0].toUpperCase()}</Text>
            </Box>
            <Text>{name}</Text>
          </Box>
          <Text>{`Há ${diasPassados} ${dia}`}</Text>
        </CardHeader>
        <CardBody>
          <Text>{comment}</Text>
          <StyledStars>
          <Rating
              count={5}
              size={24}
              value={stars}
          />  
          </StyledStars>
          { idUserComment == Number(localStorage.getItem('@ID')) ? (

            <>
          <button onClick={onOpen}>Editar</button>
          
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={"520px"}>
            <ModalHeader>Editar Comentario</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormEditComment onClose={onClose} comment={comment} stars={stars} idComment={idComment} idAdvert={idAdvert}>
              <Button
                  width={"40%"}
                  mr={3}
                  onClick={onClose}
                  borderRadius={"10px"}
                >
                  Cancelar
                </Button>
              </FormEditComment>
             
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
            </>
           
          ) :
          ( user?.type_user == 'admin' ? (
            <>
              <button onClick={()=>deleteComment(idComment,idAdvert)}>Excluir Comentario</button>
            </>
          ):
          <>
          </>)

          }
        </CardBody>
      </Card>
    </ListItem>
  );
};
