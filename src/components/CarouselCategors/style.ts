import { motion } from "framer-motion";
import styled from "styled-components";

export const StylesProjectsList = styled(motion.main)`
  display: flex;
  align-items: center;
  justify-content: center;

  .swiper_container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .swiper-pagination .swiper-pagination-bullet {
    filter: drop-shadow(0px 8px 24px rgba(18, 28, 53, 0.1));
  }

  .swiper-pagination .swiper-pagination-bullet-active {
    background: white;
  }

  .swiper-slide {
    width: 100vw;
    height: 300px;
    position: relative;
    transform: none;
  }
  .slider-controler {
    max-width: 1200px;
    width: 95%;
    height: 3.5rem;
    margin: 0 auto;
    position: absolute;
    bottom: 50%;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
  }

  .slider-arrow::after {
    content: "";
  }
  .slider-arrow {
    background: var(--colorSecond);
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
  }
  .swiper-pagination {
    bottom: 1rem;
    z-index: 1;
    margin: 0 auto;
  }
`;
export const StyledAboutCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Card = styled.div`
  background-color: var(--brand1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100%;
  img {
    min-height: 100%;
  }
  div {
    max-width: 1200px;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: start;
  }
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
`;
export const TitleCategory = styled.p`
  font-size: 5rem;
  color: var(--brand4);
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 400;
`;

export const DescripitionCategory = styled.p`
  font-size: 1.75rem;
  color: var(--brand4);
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 400;
`;
