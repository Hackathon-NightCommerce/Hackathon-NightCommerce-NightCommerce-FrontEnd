import styled from "styled-components";

export const StyledHome = styled.main`
  position: relative;
`;

export const StyledButtonsMenu = styled.div`
  display: flex;
  padding: 10px;
  gap: 25px;
`;

export const StyledButtonMenuItemRegister = styled.button`
  color: var(--grey0);
  font-weight: bold;
  margin-top: -15px;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 80%;
`;

export const StyledBannerPageHome = styled.div`
  max-width: 100%;
  width: 100%;
  position: relative;
  z-index: -1;
  text-align: center;

  img {
    max-width: 100%;
    height: 450px;
    width: 100%;
    object-fit: cover;
  }

  h1 {
    position: absolute;
    top: 30%;
    left: 0%;
    right: 0%;
    color: var(--grey10);
    font-weight: bold;
    font-size: 25px;
  }

  p {
    font-size: 25px;
    max-width: 100%;
    min-width: 250px;
    position: absolute;
    top: 40%;
    left: 0%;
    right: 0%;
    margin: auto;
    color: var(--grey10);
    font-family: "Lexend", sans-serif;
    font-weight: bold;
  }
`;
