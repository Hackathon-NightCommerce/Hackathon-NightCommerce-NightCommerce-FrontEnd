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
  Tag,
  Text,
  useDisclosure,
  useToast
} from "@chakra-ui/react"
import { useProduct, useUser } from "../../../hooks/useProduct"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { StyledDropZone, StyledPageProfile } from "./style"

import { StyledContainer } from "../../../styles/Container"
import { ListCards } from "../../../components/listCards"

import { FormCreateAdvert } from "../../../components/formCreateAdvert"
import { DeleteUser } from "../../../components/Buttons/DeleteUser"
import { useDropzone } from "react-dropzone"
import { SlSocialDropbox } from "react-icons/sl";

type TTypeView = {
  typeView: "admin" | "owner" | null
}

export const Profile = ({ typeView }: TTypeView) => {
  const { announceListUser, getAnnounceUser} = useUser()
  const {uploadFile} = useProduct();

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { id } = useParams()

  const [upload,setUpload] = useState<boolean>(false)
  const [spinner,setSpinner] = useState<boolean>(false)

  const toast = useToast()

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      setSpinner(true)

      const checkFileCsv = acceptedFiles[0].type === 'text/csv';

      if(checkFileCsv){
      
       await uploadFile(acceptedFiles[0])
       setTimeout(() => {setSpinner(false);}, 3000);
       setTimeout(() => {onClose();}, 3000);

       setTimeout(()=>{
         toast({
           title: `Produtos criados com sucesso`,
           status:'success',
           position:'top-right',
           isClosable: true,
          })
        },3000)
        
      }else{
        setTimeout(() => {setSpinner(false);}, 2000);
        setTimeout(()=> {
          toast({
            title: `O arquivo precisa ser tipo .CSV`,
            status:'error',
            position:'top-right',
            isClosable: true,

          })
        }, 2000) 
      }
    },
});

  useEffect(() => {
    getAnnounceUser(id!)
  }, [id])

  return (
    <StyledPageProfile>
      <Box as="main" background={"var(--grey8)"}>
        <Box
          className="blueDiv"
          background={"var(--grey8)"}
          position={"relative"}
          height={"330px"}
          marginBottom={"270px"}
          
        >
          <Box
            className="userContainer"
            display={"flex"}
            flexDirection={"column"}
            backgroundColor={"var(--grey10)"}
          
            gap={"1rem"}
            position={"absolute"}
            top={"30%"}
            left={"4%"}
            right={"4%"}
            padding={"30px 20px"}
            justifyContent={"space-between"}
          >
            <Box
              className="userCard"
              display={"flex"}
              gap={"1rem"}
              justifyItems={"center"}
              alignItems={"flex-start"}
              flexDirection={"column"}
            >
              <Box
                className="iconUser"
                backgroundColor={`var(--random2)`}
                borderRadius={"50px"}
                display={"flex"}
                width={"100px"}
                height={"100px"}
                alignItems={"center"}
                justifyContent={"center"}
                fontWeight={"bold"}
              >
                <Text fontSize="3xl" color={`var(--grey10)`}>
                  {announceListUser?.name[0].toUpperCase()}
                </Text>
              </Box>
              <Box className="nameTag" display={"flex"} gap={"15px"}>
                <Text as="b" fontSize="xl" color={`var(--grey2)`}>
                  {announceListUser?.name}
                </Text>
                <Tag variant="solid" colorScheme="blue">
                  Anunciante
                </Tag>
              </Box>
              <Text className="descriptionUser">
                {announceListUser?.description}
              </Text>
            </Box>
            {typeView == "owner" && (
              <Button
                width={"fit-content"}
                backgroundColor={"transparent"}
                border={"1px solid var(--brand1)"}
                color={"var(--brand1)"}
                transition={"0.5s"}
                _hover={{
                  bg: "var(--brand1)",
                  color: "var(--grey8)",
                  transition: "0.5s",
                }}
                borderRadius={"10px"}
                onClick={onOpen}
              >
                Criar Anuncio
              </Button>
            )}
            {typeView == "admin" && <DeleteUser />}
          </Box>
        </Box>

        <StyledContainer>
          <Box 
          as="section" 
          padding={"0 15px"}
          >
            {announceListUser?.adverts.length == 0 ? (
              <Text fontSize={"3xl"}>
                Esse usuário ainda não tem nenhum anuncio cadastrado 😔
              </Text>
            ) : (
              <ListCards
                advertsList={announceListUser?.adverts}
                typeView={typeView}
                
              />
            )}
          </Box>
        </StyledContainer>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW={"520px"}>
          <ModalHeader style={{
            display:'flex',
            justifyContent:'space-around',
            alignItems:'center'
          }}>
            <Button
                width={"fit-content"}
                backgroundColor={"transparent"}
                border={"1px solid var(--brand1)"}
                color={"var(--brand1)"}
                transition={"0.5s"}
                _hover={{
                  bg: "var(--brand1)",
                  color: "var(--grey8)",
                  transition: "0.5s",
                }}
                borderRadius={"10px"}
                onClick={()=>setUpload(false)}
              >
                Criar manualmente
              </Button>
            <Button
                width={"fit-content"}
                backgroundColor={"transparent"}
                border={"1px solid var(--brand1)"}
                color={"var(--brand1)"}
                transition={"0.5s"}
                _hover={{
                  bg: "var(--brand1)",
                  color: "var(--grey8)",
                  transition: "0.5s",
                }}
                borderRadius={"10px"}
                onClick={()=>setUpload(true)}
              >
                Uploads de produtos
              </Button>
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {upload ? 
            <>
                {spinner ?
                    <>
                      <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                      marginTop={'50px'}
                      marginLeft={'45%'}
                      
                    /> 
                    <p style={{
                      margin:'auto',
                      marginLeft:'25%',
                      color:'var(--brand1)',
                      fontSize:'18px'
                    }}>
                      Processando os dados, aguarde
                    </p>
                    </>
                    :
                    <StyledDropZone {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Arraste e solte um arquivo .csv aqui </p>
                    <SlSocialDropbox style={{
                      margin:'auto',
                      width:'100%',
                      height:'150px',
                  
                    }}/>
                  </StyledDropZone>
                }
            </> :  
            <FormCreateAdvert onClose={onClose}>
              <Button
                width={"40%"}
                mr={3}
                onClick={onClose}
                borderRadius={"10px"}
              >
                Cancelar
              </Button>
            </FormCreateAdvert>
          }
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </StyledPageProfile>
  )
}
