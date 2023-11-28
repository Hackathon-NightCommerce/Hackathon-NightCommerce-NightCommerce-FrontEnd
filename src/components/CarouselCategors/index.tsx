import {
  Card,
  DescripitionCategory,
  StylesProjectsList,
  TitleCategory,
} from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "swiper/css/bundle";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
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

const categorys = [
  {
    category: "Eletrônicos",
    icon: eletronicos,
    description: "Explore a última tecnologia em eletrônicos.",
  },
  {
    category: "Moda e Vestuário",
    icon: modaEVestuario,
    description: "Descubra as últimas tendências da moda.",
  },
  {
    category: "Casa e Cozinha",
    icon: casaECozinha,
    description: "Encontre itens para decorar sua casa e cozinha.",
  },
  {
    category: "Livros e Mídia",
    icon: livrosEMidia,
    description: "Explore livros e mídia para todos os gostos.",
  },
  {
    category: "Beleza e Cuidados Pessoais",
    icon: belezaECuidadosPessoais,
    description: "Cuide de sua beleza e bem-estar.",
  },
  {
    category: "Esportes e Lazer",
    icon: esportesELazer,
    description: "Equipe-se para seus esportes favoritos.",
  },
  {
    category: "Brinquedos e Jogos",
    icon: brinquedosEJogos,
    description: "Diversão garantida com brinquedos e jogos.",
  },
  {
    category: "Automotivo",
    icon: automotivo,
    description: "Produtos automotivos para seu veículo.",
  },
  {
    category: "Alimentos e Bebidas",
    icon: alimentosEBebidas,
    description: "Descubra deliciosos alimentos e bebidas.",
  },
  {
    category: "Móveis e Decoração",
    icon: moveisEDecoracao,
    description: "Transforme sua casa com móveis e decoração.",
  },
];

export function CarouselCategors() {
  const swiperConfig = {
    effect: "slide",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    modules: [EffectCoverflow, Pagination, Navigation],
    className: "swiper_container",
  };

  return (
    <>
      <StylesProjectsList>
        <Swiper {...swiperConfig}>
          {categorys.map((category, index) => (
            <SwiperSlide key={index}>
              <Card>
                <div>
                  <img src={category.icon} alt={category.category} />
                  <span>
                    <TitleCategory>{category.category}</TitleCategory>
                    <DescripitionCategory>
                      {category.description}
                    </DescripitionCategory>
                  </span>
                </div>
              </Card>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <AiOutlineArrowLeft color="white" />
            </div>
            <div className="swiper-button-next slider-arrow">
              <AiOutlineArrowRight color="white " />
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </Swiper>
      </StylesProjectsList>
    </>
  );
}
