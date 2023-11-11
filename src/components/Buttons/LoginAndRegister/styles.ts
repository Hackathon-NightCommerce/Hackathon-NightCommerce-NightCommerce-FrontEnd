import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 31px;
  margin-right: 62px;

  .login {
    color: var(--brand1);
    font-weight: bold;
    border: 1px solid var(--whiteFixed);
    padding: 5px;
  }
  .login:hover {
    color: var(--grey0);
    border: 1px solid var(--grey4);
  }
  .register {
    color: var(--grey0);
    font-weight: bold;
    border: 1px solid var(--whiteFixed);
    padding: 5px;
    width: 100px;
  }
  .register:hover {
    border: 1px solid var(--grey4);
    color: var(--brand1);
  }
  @media (max-width: 600px) {
    flex-direction: column;
    justify-content: center;
    margin-left: 50px;
  }
`;
