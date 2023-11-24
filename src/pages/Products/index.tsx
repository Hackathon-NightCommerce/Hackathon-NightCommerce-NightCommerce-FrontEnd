import { StyledProducts} from "./style";
import { useEffect, useState } from "react";
import { useProduct, useUser } from "./../../hooks/useProduct";
import { useParams } from "react-router-dom";
import { Box, Button, Image, Text, List, Link } from "@chakra-ui/react";
import { useNavigate, } from "react-router-dom";
import { FormComment } from "../../components/formComment";
import { CommentItem } from "../../components/commentItem";
import { StyledContainer } from './../../styles/Container';
import {CardAdvert} from '../../components/cardAdvert';
import {ContainerList} from '../../components/listCards/style';
import {ButtonSeeMore} from './style';

export function Products() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { userId, user,getAnnounceUser,announceListUser} = useUser();

  const { getAdvert, advert, page,getAdvertsByFilter} = useProduct();
  const [couverImg, setCouverImg] = useState<string | undefined>();

  useEffect(()=>{
      getAnnounceUser(advert?.user.id!)
  },[])

  useEffect(() => {
    const fetchAdvert = async () => {
      if (id) {
        await getAdvert(parseInt(id));
        setCouverImg(advert?.cover_image);
      }
    };
    fetchAdvert();
  }, [id]);

  useEffect(()=>{

    getAdvertsByFilter({category:advert?.category})
    getAnnounceUser(advert?.user.id!)
  
  },[advert])

  return (
    <StyledProducts>
      <StyledContainer style={{
        backgroundColor:'var(--whiteFixed)',
        justifyContent:"space-around",
        width: '85%',
        }}>
        <Box
          as="section"
          maxWidth={'100%'}
          width={'500px'}
          top="20%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
          padding="3px"
          height={'300px'}
        >
          <Image
            src={couverImg ? couverImg : advert?.cover_image}
            backgroundColor="var(--grey10)"
            height="290px"
            width={["100%", "500px"]}
            padding="30px 20px"
            objectFit="contain"
            borderRadius="10px"
            
          />
        </Box>

        <Box
          as="section"
          width={["100%", "30%"]}
          top="20%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
          padding="3px"
          height={'300px'}
        >
          <Box
            as="article"
            backgroundColor="var(--grey10)"
            padding=""
            borderRadius="10px"
            height={'290px'}
           
          >
            <Text as="b" fontSize="20" color={`var(--grey2)`}>
              Fotos
            </Text>
            <Box
              as="figure"
              display="grid"
              gap={'15px'}
              gridTemplateColumns="repeat(3, 1fr)"
              gridTemplateRows="repeat(3, 1fr)"
              
            >
              {/* {advert?.images &&
                advert?.images.length > 1 &&
                advert?.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.image}
                    className="optionalImg"
                    height="100px"
                    width="100px"
                    objectFit="cover"
                    borderRadius="10px"
                    onClick={() => setCouverImg(image.image)}
                 
                  />
                ))} */}
              <Image
                key={advert?.cover_image}
                src={advert?.cover_image}
                className="optionalImg"
                height="100px"
                width="100px"
                objectFit="cover"
                borderRadius="10px"
                onClick={() => setCouverImg(advert?.cover_image)}
              />
            </Box>
          </Box>
        </Box>
      </StyledContainer >


           <Box
            as="article"
            maxWidth="100%"
            width="85%"
            margin={'auto'}
            marginTop={50}
            display="flex"
            flexDirection="column"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="20px"
          > 
             <Text as="b" fontSize="3xl" color={`var(--grey2)`}>
              {advert?.name}
            </Text> 
             <Box
              width="100%"
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              gap="10px"
            >
              <Box
                width="40%"
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                gap="10px"
              >
              </Box>
              <Text as="b" fontSize="xl" color={`var(--grey2)`}>
                R$ {advert?.price},00
              </Text>
            </Box>
            <Button
                backgroundColor={"var(--brand1)"}
                color={"var(--grey8)"}
                minWidth={"15%"}
                border={"1px solid var(--brand1)"}
                transition={"0.5s"}
                width={'150px'}
                _hover={{
                  transition: "0.5s",
                  filter:'brightness(1.5)'
                }}
                borderRadius={"10px"}
                type="submit"
              >
                Adcionar
            </Button>
          <Box
            as="article"
            backgroundColor="var(--grey10)"
            width="100%"
            display="flex"
            padding="30px 20px"
            flexDirection="column"
            alignItems="initial"
            borderRadius="10px"
          >
            <Text as="b" fontSize="xl" color={`var(--grey2)`}>
              Descrição
            </Text>
            <Text fontSize="xl" color={`var(--grey2)`}>
              {advert?.description}
            </Text>
          </Box>
        </Box> 
        <Box
            as="article"
            maxWidth="100%"
            width="85%"
            margin={'auto'}
            marginTop={30}
            display="flex"
            flexDirection="column"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="20px"
          >
            <Text as="b" fontSize="xl" color={`var(--grey2)`}>
              Comentários
            </Text>
            <List display="flex" flexDirection="column" gap="1rem">
              {advert?.comments?.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment.comment}
                  name={comment.user.name}
                  created_at={comment.created_at}
                  idUserComment={comment.user.id}
                  idComment={comment.id}
                  idAdvert={Number(id)}
                />
              ))}
            </List>
          </Box>

       {localStorage.getItem("@TOKEN") == undefined ? (
            <></>
          )
            :
            user?.type_user !== 'admin' &&
            <>
              <br/>
              <Box
                as="article"
                maxWidth="100%"
                width="85%"
                margin={'auto'}
                display="flex"
                flexDirection="column"
                padding="30px 30px"
                backgroundColor="var(--grey10)"
                borderRadius="10px"
                gap="20px"
                >
                  <FormComment id={id!} />
            </Box>
            </>
          }
       <br/>

       <ContainerList style={{
        display:'flex',
        flexDirection:'column',
        maxWidth:"100%",
        width:'85%',
        margin:'auto',
        gap:'20px',
       }}>
           <h1 style={{
            color:'var(--brand1)',
            fontSize:'25px',
          
          }}>Produtos similares</h1>

        <List style={{
          maxWidth:'fit-content',
          width:'fit-content',
          gap:'70px',
          justifyContent:'space-between'
        }}>
          {page?.data.slice(0, 4).map((product) => (
            <CardAdvert advert={product} typeView={null} key={product.id} />
          ))}
          
        </List>

       </ContainerList><br/><br/>

       <ContainerList style={{
        display:'flex',
        flexDirection:'column',
        maxWidth:"100%",
        width:'85%',
        margin:'auto',
        gap:'20px',
  
       }}>
           <h1 style={{
            color:'var(--brand1)',
            fontSize:'25px',
            
          }}>Produtos do Anunciante </h1>

        <List style={{
          maxWidth:'fit-content',
          width:'fit-content',
          gap:'70px',
          justifyContent:'space-between'
        }}>
          {announceListUser?.adverts.slice(0,4).map((product)=>{
              return(
                <CardAdvert advert={product} typeView={null} key={product.id}/>
              )
          })}
          
        </List>
       </ContainerList> 
       <ButtonSeeMore onClick={()=>navigate(`/profile/${advert?.user.id!}`)}>Ver todos os anuncios</ButtonSeeMore><br/><br/>
    </StyledProducts >
  );
}
