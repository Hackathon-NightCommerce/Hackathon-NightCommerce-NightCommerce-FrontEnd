import { Card, DescripitionCategory, StylesProjectsList } from "./style";
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

export function CarouselCategors() {
  const swiperConfig = {
    effect: "coverflow",
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
                <img src={category.icon} alt={category.category} />{" "}
              </Card>
              <DescripitionCategory>{category.category}</DescripitionCategory>
            </SwiperSlide>
          ))}
          <div className="slider-controler">
            <div className="swiper-button-prev slider-arrow">
              <AiOutlineArrowLeft />
            </div>
            <div className="swiper-pagination"></div>
            <div className="swiper-button-next slider-arrow">
              <AiOutlineArrowRight />
            </div>
          </div>
        </Swiper>
      </StylesProjectsList>
    </>
  );
}
