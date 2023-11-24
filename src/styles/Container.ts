import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 2rem;
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 600px) {
    max-width: 80%;
    flex-direction: row;
  }
  @media (min-width: 1000px) {
    max-width: 1200px;
  }
  @media (min-width: 1000px) {
    max-width: 1400px;
  }
`;
