import {styled} from 'styled-components';


export const StyledMain = styled.main`

  font-family: "Lexend", sans-serif;
  height: 90vh;
  display: flex;
  justify-content: space-between;
  background-color: var(--brand4);

`

export const StyledContainerRecoverPassword = styled.form`

    max-width: 90%;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: var(--whiteFixed);
    margin: auto;
    margin-top: 80px;
    padding: 15px;
    border-radius: 15px;

    h1{
        margin-left: 10px;
        font-weight: bold;
        font-size: 1.5rem;
    }

    button{
        background-color: var(--brand1);
        display: flex;
        max-width: 90%;
        width: 286px;
        height: 3rem;
        padding: 0.75rem 1.75rem;
        justify-content: center;
        color: var(--whiteFixed);
        font-weight: bold;
        gap: 0.625rem;
        flex-shrink: 0;
        border-radius: 0.25rem;
        transition: box-shadow 0.3s ease-in-out;
        margin: auto;
    }
`;