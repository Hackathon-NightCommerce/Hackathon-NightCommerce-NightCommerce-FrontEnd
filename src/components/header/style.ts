import styled from "styled-components"

export const StyledMenu = styled.div`
  height: 80px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  font-family: "Lexend", sans-serif;
  background-color: var(--whiteFixed);

  img {
    width: 150px;
    height: 60px;
    margin-left: 62px;

    @media (min-width: 599px) {
      width: 250px;
      height: 80ox;
    }
  }
`
