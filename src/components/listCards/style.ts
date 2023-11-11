import styled from "styled-components";
export const ContainerList = styled.div`
  overflow-x: scroll;
  width: 100%;
  height: fit-content;
  ul {
    display: flex;
    gap: 1.5rem;
    margin: 1rem;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    flex-wrap: nowrap;
  }
  ul li {
    animation: fadeinout 1s linear;
    -webkit-animation: fadeinout 3s;
    -moz-animation: fadeinout 3s;
    -o-animation: fadeinout 3s;
    -ms-animation: fadeinout 3s;
    @keyframes fadeinout {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }

  ul li:hover {
    box-shadow: 1px 1px 5px black;
    transition: 0.5s;
  }

  ul li:hover p {
    display: block;
  }

  cursor: pointer;
  @media (min-width: 600px) {
    overflow-x: unset;
    display: flex;
    justify-content: center;
    ul {
      width: 100%;
      max-width: 700px;
      flex-wrap: wrap;
    }
  }
  @media (min-width: 1200px) {
    overflow-x: unset;
    ul {
      width: 100%;
      max-width: 1000px;
      flex-wrap: wrap;
    }
  }
`;
