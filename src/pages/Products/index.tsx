import { StyledProducts } from "./style";
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
  const { getAdvert, advert } = useProduct();
  const [couverImg, setCouverImg] = useState<string | undefined>();


  useEffect(() => {
    const fetchAdvert = async () => {
      if (id) {
        await getAdvert(parseInt(id));
        setCouverImg(advert?.cover_image);

      }
    };
    fetchAdvert();
  }, [id]);

  return (
    <StyledProducts>
      <Box background="var(--brand1)"
        height="70%"
        width="100%"
        position="absolute"
        top="0"
        zIndex="-1"
      />
      <StyledContainer>
        <Box
          as="section"
          width={["100%", "50%"]}
          top="20%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
          padding="3px"
        >
          <Image
            src={couverImg ? couverImg : advert?.cover_image}
            backgroundColor="var(--grey10)"
            height="400px"
            width={["100%", "700px"]}
            padding="30px 20px"
            objectFit="contain"
            borderRadius="10px"
          />
          <Box
            as="article"
            width="100%"
            display="flex"
            flexDirection="column"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="20px"
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
            {userId ?
              <Link
                backgroundColor="var(--brand1)"
                fontWeight="500"
                color="white"
                width="30%"
                textAlign="center"
                borderRadius="5px"
                height="100%"
                href={`https://api.whatsapp.com/send?phone=${advert?.user?.phone}`}
                isExternal
              >
                Comprar
              </Link>
              :
              <Link
                backgroundColor="var(--brand1)"
                fontWeight="500"
                color="white"
                width="30%"
                textAlign="center"
                borderRadius="5px"
                height="100%"
                href={`/login`}
              >
                Comprar
              </Link>
            }
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
          {localStorage.getItem("@TOKEN") == undefined ? (
            <></>
          )

            :

            user?.type_user !== 'admin' &&
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
              <FormComment id={id!} />
            </Box>

          }

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
        >
          <Box
            as="article"
            backgroundColor="var(--grey10)"
            height="450px"
            width="100%"
            padding="30px 30px"
            borderRadius="10px"
          >
            <Text as="b" fontSize="3xl" color={`var(--grey2)`}>
              Fotos
            </Text>
            <Box
              as="figure"
              display="grid"
              gridTemplateColumns="repeat(3, 1fr)"
              gridTemplateRows="repeat(3, 1fr)"
              gap="10px"
              align-items="center"
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
          <Box
            as="article"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            padding="30px 30px"
            backgroundColor="var(--grey10)"
            borderRadius="10px"
            gap="10px"
          >
            <Box
              className="icon"
              backgroundColor="var(--random2)"
              borderRadius="50%"
              display="flex"
              width="80px"
              height="80px"
              alignItems="center"
              justifyContent="center"
              fontWeight="bold"
              marginRight="5px"
            >
              <Text fontSize="2xl" color={`var(--grey10)`}>
                {advert?.user?.name.split('\n')[0][0].toUpperCase()}
              </Text>
            </Box>
            <Text as="b" fontSize="3xl" color={`var(--grey2)`}>
              {advert?.user.name}
            </Text>
            <Text fontSize="xl" textAlign="center" color={`var(--grey2)`}>
              {advert?.user.description}
            </Text>
            <Button
              colorScheme="purple"
              onClick={() => {
                navigate(`/profile/${advert?.user?.id}`);
              }}
            >
              Ver Todos os Anúncios
            </Button>
          </Box>
        </Box>
      </StyledContainer >
    </StyledProducts >
  );
}
