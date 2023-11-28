import { styled } from "styled-components";

export const StyledAside = styled.aside`
  .range_container {
    display: flex;
    flex-direction: column;
    label {
      font-weight: 700;
      font-size: 1.2rem;
    }
  }
  button {
      height: 40px;
      width: 100%;
      background-color: var(--random4);
      color: white;
      font-weight: 600;
      margin-top: 40px;
    }
    @media (min-width: 600px){
      display: flex;
      flex-direction: column;
    }
`;

