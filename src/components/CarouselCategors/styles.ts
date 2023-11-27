import styled from "styled-components";

export const StyledAboutCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Circle = styled.div`
  display: flex;
  padding: 10px;
  background-color: var(--brand1);
  width: 100px;
  height: 100px;
  border-radius: 50%;
  img {
    min-width: 30px;
    min-height: 30px;
  }
`;
export const DescripitionCategory = styled.div`
  color: var(--brand1);
  width: 70%;
  text-align: center;
`;
