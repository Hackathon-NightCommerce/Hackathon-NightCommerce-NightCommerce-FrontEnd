import styled from "styled-components";

export const StyledInputsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  div {
    width: 45%;
  }
`;
export const BannerCouser = styled.label`
  cursor: pointer;
  border: 2px dashed var(--grey3);
  border-radius: 5px;
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input[type="file"] {
    display: none;
  }
  margin: 30px 0  30px 0;
  figure {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: var(--brand3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

export const ContanerBannerImage = styled.figure`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export const BannerImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 5px;
  object-fit: fill;
`;

export const Erros = styled.p`
  height: 1rem;
  font-size: 0.8rem;
  color: var(--random2);
  font-weight: bold;
`;
