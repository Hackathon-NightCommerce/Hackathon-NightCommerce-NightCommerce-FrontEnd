import { StyledContainerBox, StyledProducts} from "./style";
import { useEffect, useState } from "react";
import { useProduct, useUser } from "./../../hooks/useProduct";
import { useParams } from "react-router-dom";
import { Box, Button, Image, Text, List, Link } from "@chakra-ui/react";
import { useNavigate, } from "react-router-dom";
import { FormComment } from "../../components/formComment";
import { CommentItem } from "../../components/commentItem";
import { StyledContainer } from './../../styles/Container';

export function Products() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { userId, user } = useUser();
  // const { getAdvert, advert } = useProduct();
  const [couverImg, setCouverImg] = useState<string | undefined>();
  const [advert,setAdvert]=useState({
    id: 1,
    brand: 'Example Brand',
    model: 'Example Model',
    year: '2022',
    fuel: 'Gasoline',
    mileage: '50000',
    color: 'Blue',
    table_fipe: true,
    price: '25000',
    description: 'This is a mock car description.',
    cover_image: 'https://casasfreire.agilecdn.com.br/celular-motorola-moto-e13-64g-branco_331121.png?v=28-398561947',
    images: [
    {
      id: 1,
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmybIJVxlemyVAYzx7vP2RpmBTVnR6HV2jB0gAec8oJS2Cii14HZnSjkEws3L1XHu-WqI&usqp=CAU'
    },
    {
      id: 1,
      image:'https://images.tcdn.com.br/img/img_prod/995671/celular_smartphone_apple_iphone_13_256gb_6_1_rosa_1465_1_6eb13f49639f12eb7f8f4a7b6c5bde51.jpg'
    },
    {
      id: 1,
      image:'https://images.tcdn.com.br/img/img_prod/995671/celular_smartphone_apple_iphone_13_256gb_6_1_rosa_1465_1_6eb13f49639f12eb7f8f4a7b6c5bde51.jpg'
    },
    {
      id: 1,
      image:'https://images.tcdn.com.br/img/img_prod/995671/celular_smartphone_apple_iphone_13_256gb_6_1_rosa_1465_1_6eb13f49639f12eb7f8f4a7b6c5bde51.jpg'
    },{
      id: 1,
      image:'https://images.tcdn.com.br/img/img_prod/995671/celular_smartphone_apple_iphone_13_256gb_6_1_rosa_1465_1_6eb13f49639f12eb7f8f4a7b6c5bde51.jpg'
    }
  ],
    comments: [
      {
        id: 1,
        comment: "This is a mock comment.",
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          cpf: "123.456.789-01",
          phone: "123-456-7890",
          birth_date: new Date("1990-01-01"),
          description: "This is a mock user description.",
          password: "mockpassword123",
          type_user: "client",
          address: {
            cep: "12345-678",
            state: "Example State",
            city: "Example City",
            road: "Example Road",
            number: "123",
            complement: "Apt 101",
          },
        },
        advert: 123, 
        created_at: "2023-01-01T12:00:00Z", 
      }
    ],
    user: {}, // Dados mockados do usuário, substitua conforme necessário
    published: true,
  })



  useEffect(() => {
    const fetchAdvert = async () => {
      if (id) {
        // await getAdvert(parseInt(id));
        // setCouverImg(advert?.cover_image);

      }
    };
    fetchAdvert();
  }, [id]);

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
              {advert?.images &&
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
                    border={'1px solid black'}
                  />
                ))}
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
            width="950px"
            margin={'auto'}
            marginTop={50}
            display="flex"
            flexDirection="column"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="20px"
            className="StyledContainerBox"
          > 
             <Text as="b" fontSize="3xl" color={`var(--grey2)`}>
              {advert?.brand} {advert?.model}
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
                <span>{advert?.year}</span>
                <span>{advert?.mileage} KM</span>
              </Box>
              <Text as="b" fontSize="xl" color={`var(--grey2)`}>
                R$ {advert?.price},00
              </Text>
            </Box>
                  <button style={{
                    backgroundColor:'blue',
                    width:'150px'
                  }}>Adcionar</button>
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
        </Box> 
       <Box
              as="article"
              maxWidth="100%"
              width="950px"
              margin={'auto'}
              marginTop={30}
              display="flex"
              flexDirection="column"
              padding="30px 30px"
              backgroundColor="var(--grey10)"
              borderRadius="10px"
              gap="20px"
              className="StyledContainerBox"
        >
       {localStorage.getItem("@TOKEN") == undefined ? (
            <></>
          )

            :

            user?.type_user !== 'admin' &&
            <Box
            as="article"
            maxWidth="100%"
            width="950px"
            margin={'auto'}
            display="flex"
            
            flexDirection="column"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="20px"
            className="StyledContainerBox"
            >
              <FormComment id={id!} />
            </Box>

          }
       </Box>
    </StyledProducts >
  );
}
