import styled from "styled-components";

const StyledFooter = styled.footer`
  background: var(--grey0);
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-top: 50px;
  a {
    color: var(--grey10);
  }
  @media (min-width: 600px) {
    flex-direction: row;

    p {
      padding-right: 90px;
    }
  }

  p {
    color: var(--grey10);
  }

  button {
    background: var(--grey1);
    padding: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default StyledFooter;
