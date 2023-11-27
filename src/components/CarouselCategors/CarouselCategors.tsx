import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";
import { Circle, DescripitionCategory, StyledAboutCarousel } from "./styles";
import { ReactElement } from "react";
import eletronicos from "../../assets/categoryIcons/Eletronicos.svg";
import modaEVestuario from "../../assets/categoryIcons/ModaEVestuario.svg";
import casaECozinha from "../../assets/categoryIcons/CasaECozinha.svg";
import livrosEMidia from "../../assets/categoryIcons/LivrosEMidia.svg";
import belezaECuidadosPessoais from "../../assets/categoryIcons/BelezaECuidadosPessoais.svg";
import esportesELazer from "../../assets/categoryIcons/EsportesELazer.svg";
import brinquedosEJogos from "../../assets/categoryIcons/BrinquedosEJogos.svg";
import automotivo from "../../assets/categoryIcons/Automotivo.svg";
import alimentosEBebidas from "../../assets/categoryIcons/AlimentosEBebidas.svg";
import moveisEDecoracao from "../../assets/categoryIcons/MoveisEDecoracao.svg";


// const location = useLocation();
const responsive = {
  0: { items: 1 },
  400: { items: 2 },
  568: { items: 3 },
  780: { items: 4 },
  1024: { items: 5 },
};

const categorys = [
  { category: "Eletrônicos", icon: eletronicos },
  { category: "Moda e Vestuário", icon: modaEVestuario },
  { category: "Casa e Cozinha", icon: casaECozinha },
  { category: "Livros e Mídia", icon: livrosEMidia },
  { category: "Beleza e Cuidados Pessoais", icon: belezaECuidadosPessoais },
  { category: "Esportes e Lazer", icon: esportesELazer },
  { category: "Brinquedos e Jogos", icon: brinquedosEJogos },
  { category: "Automotivo", icon: automotivo },
  { category: "Alimentos e Bebidas", icon: alimentosEBebidas },
  { category: "Móveis e Decoração", icon: moveisEDecoracao },
];

const items: ReactElement[] = [];

categorys.map((category, index) =>
  items.push(
    <StyledAboutCarousel key={index}>
      <Circle >
        <img src={category.icon} alt={category.category} />{" "}
      </Circle>
      <DescripitionCategory>{category.category}</DescripitionCategory>
    </StyledAboutCarousel>
  )
);

export const CarouselCategors = () => (
  <AliceCarousel
    mouseTracking
    touchTracking
    items={items}
    responsive={responsive}
    controlsStrategy="alternate"
    disableButtonsControls
    animationDuration={4000}
    autoPlay
    paddingLeft={20}
    autoPlayStrategy="default"
    infinite
  />
);
