import styled from "styled-components";

export const StyledProducts = styled.main`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  background-color: transparent;

  .optionalImg{
    cursor:pointer;
  }
  span {
    width: 100%;
    padding: 3px;
    background-color: var(--grey5);
    color: var(--brand1);
    font-weight: 500;
    border-radius: 5px;
    display: flex;
    justify-content: center;
  }
  footer {
    position: absolute;
    bottom: 0px;
  }

`;

export const StyledContainerBox = styled.div`
  .css-r6wvxp{
    width: 60%;
  }

  @media(min-width: 600px){
    width: 60%;
  }
`
