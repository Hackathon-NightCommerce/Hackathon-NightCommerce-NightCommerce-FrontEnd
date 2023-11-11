import styled from "styled-components"

export const StyledPageProfile = styled.div`
  min-height: 100vh;

  @media (min-width: 600px) {
    .blueDiv {
      margin-bottom: 170px;
    }

    .userContainer {
      left: 10%;
      right: 10%;
      /* height: 330px; */
      max-width: 1200px;
      margin: 0 auto;
    }

    ul {
      flex-wrap: wrap;
      gap: 1.5rem;
      justify-content: center;
    }
  }
`
