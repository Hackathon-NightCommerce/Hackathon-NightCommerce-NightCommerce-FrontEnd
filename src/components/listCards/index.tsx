import { List, Text } from "@chakra-ui/react"
import { ContainerList } from "./style"
import { TAdvert } from "../../schemas/advert.schema"
import { CardAdvert } from "../cardAdvert"
import { ITypeView } from "../Buttons/BottomLogicView"

interface ListCardsProps {
  advertsList: TAdvert[] | undefined
  typeView: ITypeView
}

export const ListCards = ({ advertsList, typeView }: ListCardsProps) => {

  return (
    <>
      <Text
        as={"h1"}
        fontSize={"2xl"}
        fontWeight={"bold"}
        width={"85%"}
        marginLeft={"30px"}
      >
        Anúncios
      </Text>
      <ContainerList>
        <List>
          {advertsList?.map((advert) => (
            <CardAdvert typeView={typeView} advert={advert} key={advert.id} />
          ))}
        </List>
      </ContainerList>
    </>
  )
}
