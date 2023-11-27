import { useProduct } from "../../hooks/useProduct";
import { StyledAside } from "./style";
import { FilterComponent } from "../filterComponets/index";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { RangeFilter } from "../rangeFilter/index";

const AsideFilters = () => {
  const { filters, getAdverts } = useProduct();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const renderFilters = () => (
    <StyledAside>
      {filters?.nameAdvert && (
        <FilterComponent title="Nome Do produto" filterKey="nameAdvert" filter={filters.nameAdvert} />
      )}
      {filters?.brandAdvert && (
        <FilterComponent title="Marca" filterKey="brandAdvert" filter={filters.brandAdvert} />
      )}
      {filters?.categoryAdvert && (
        <FilterComponent title="Categoria" filterKey="categoryAdvert" filter={filters?.categoryAdvert} />
      )}
      <div className="range_container">
        {filters?.minPrice && filters?.maxPrice && (
          <RangeFilter min={filters.minPrice} max={filters.maxPrice} title={"Preço"} filterKey="Price" />
        )}
      </div>
      <button onClick={() => getAdverts()}>Limpar Filtros</button>
    </StyledAside>
  );

  return window.innerWidth < 600 ? (
    <>
      <Button
        onClick={onOpen}
        color={"white"}
        bg={`var(--brand1)`}
        width={"50%"}
        alignSelf={"center"}
        borderRadius={"4px"}
        height={"40px"}
      >
        Filtros
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={true}>
        <ModalContent bg={"white"} overflowY={"scroll"} padding={10}>
          <ModalHeader textAlign={"center"} position={"absolute"} top={3} left={10} fontWeight={700} marginBottom={"50px"}>
            Filtros
          </ModalHeader>
          <ModalCloseButton position={"absolute"} right={10} top={5} color={"rgba(0,0,0,0.3)"} />
          <ModalBody>{isOpen && renderFilters()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  ) : (
    renderFilters()
  );
};

export default AsideFilters;
