import styled from "styled-components";

const StyledLogin = styled.main`
  font-family: "Lexend", sans-serif;
  height: 100vh;
  display: flex;
  justify-content: space-between;

  flex-direction: column;
  font-family: Inter;
  background-color: var(--brand4);
  .login-container {
    width: 100vw;
    display: flex;
    justify-content: center;
    margin: 32px 0;
  }
  .login-box {
    background-color: white;
    padding: 10px;
    width: 90%;
  }
  .login-box h1 {
    font-weight: bold;
    font-size: 1.5rem;
    padding: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  p {
    font-family: "Lexend", sans-serif;
  }
  button {
    font-family: "Lexend", sans-serif;
  }
  button:disabled{
    background:var(--brand3)
  }
  .btn-login {
    background-color: var(--brand1);
    display: flex;
    width: 17.88081rem;
    height: 3rem;
    padding: 0.75rem 1.75rem;
    justify-content: center;
    align-items: center;
    color: var(--whiteFixed);
    font-weight: bold;
    gap: 0.625rem;
    flex-shrink: 0;
    border-radius: 0.25rem;
    transition: box-shadow 0.3s ease-in-out;
  }
  .btn-login:hover {
    box-shadow: 0 5px 15px black;
  }

  .register-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 16px;
  }

  .register-btn {
    border-radius: 0.25rem;
    border: 1.5px solid var(--grey-scale-grey-4, #adb5bd);
    display: flex;
    width: 17.88081rem;
    height: 3rem;
    padding: 0.75rem 1.75rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    flex-shrink: 0;
    color: var(--grey0);
    font-weight: bold;
    transition: box-shadow 0.3s ease-in-out;
  }
  .register-btn:hover {
    box-shadow: 0 5px 15px black;
  }
  .remember-password {
    display: flex;
    justify-content: end;
    padding: 8px;
    font-family: "Lexend", sans-serif;
    font-size: 0.8rem;
    color: var(--grey3);
    font-weight: bold;
    transition: box-shadow 0.3s ease-in-out;
    p{
      cursor: pointer;
    }
  }
  .not-acount {
    color: var(--grey3);
    font-weight: bold;
  }
  @media (min-width: 600px) {
    .login-box {
      width: 80%;
    }
  }
  .confirm-box {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  .btn-login,
  .register-btn {
    width: 100%;
  }
  @media (min-width: 1000px) {
    .login-box {
      width: 30%;
    }
  }
`;

export default StyledLogin;


export const StyledFormForgoutPassword = styled.form`

    max-width: 550px;
    background: var(--whiteFixed);
    display: flex;
    margin: auto;
    padding: 25px;
    border-radius: 15px;

    .buttonsForgoutPassword{
      display: flex;
      justify-content: flex-end;
      
      .buttonVoltar{
        border-radius: 0.25rem;
        border: 1.5px solid var(--grey-scale-grey-4, #adb5bd);
        display: flex;
        width: 100px;
        height: 3rem;
        padding: 0.75rem 1.75rem;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        color: var(--grey0);
        font-weight: bold;
        transition: box-shadow 0.3s ease-in-out;
        margin-right:20px;
      }

      .buttonSubmit{
        background-color: var(--brand1);
        display: flex;
        max-width: 90%;
        width: 100px;
        height: 3rem;
        padding: 0.75rem 1.75rem;
        justify-content: center;
        color: var(--whiteFixed);
        font-weight: bold;
        flex-shrink: 0;
        border-radius: 0.25rem;
        transition: box-shadow 0.3s ease-in-out;
      }

    }
`
