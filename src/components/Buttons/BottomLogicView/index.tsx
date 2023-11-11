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
  useDisclosure,
} from "@chakra-ui/react"
import { useProduct } from "../../../hooks/useProduct"
import { FormEditAdvert } from "../../FormEditAdvert"

export type ITypeView = "admin" | "owner" | "visitor" | null

interface IBottomLogicViewProps {
  typeView: ITypeView
  idAdvert: number
  idUser: string
}

export const BottomLogicView = ({
  typeView,
  idAdvert,
  idUser,
}: IBottomLogicViewProps) => {
  const { adminDeleteAdvert } = useProduct()
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (typeView == "admin") {
    return (
      <Box className="buttonsAdmin">
        <Button
          variant="outline"
          marginRight={"16px"}
          onClick={(e) => {
            e.stopPropagation()
            adminDeleteAdvert(idAdvert, idUser)
          }}
        >
          Deletar
        </Button>
      </Box>
    )
  } else if (typeView == "owner") {
    return (
      <>
        <Box className="buttonsAdmin">
          <Button
            variant="outline"
            marginRight={"16px"}
            onClick={(event) => {
              event.stopPropagation()
              onOpen()
            }}
          >
            Editar
          </Button>
          <Button
            variant="outline"
            marginRight={"16px"}
            onClick={(event) => {
              event.stopPropagation()
              adminDeleteAdvert(idAdvert, idUser)
            }}
          >
            Deletar
          </Button>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent maxW={"520px"}>
            <ModalHeader>Editar Anuncio</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormEditAdvert id={idAdvert} onClose={onClose}>
                <Button
                  width={"40%"}
                  mr={3}
                  onClick={onClose}
                  borderRadius={"10px"}
                >
                  Cancelar
                </Button>
              </FormEditAdvert>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  return <></>
}
